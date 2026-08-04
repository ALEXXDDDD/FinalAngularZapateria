import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CarritoItem } from 'src/app/modules/matenimiento/models/carritoItem/carritoItem.model';
import { firstValueFrom, Subscription } from 'rxjs';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { ResponsePerfil } from 'src/app/modules/matenimiento/models/perfil/perfil-response.model';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { OrdenService } from 'src/app/modules/matenimiento/service/orden/orden.service';
import { RequestVWOrden } from 'src/app/modules/matenimiento/models/orden/orden-responseVWmodel';

interface RequestVOrdenPayload {
  idOrden: number;
  fechaOrden: string;
  fechaRequerido?: string | null;
  nombreProd: string;
  precioUnitario: number;
  codigoOrden?: string | null;
  cantidad: number;
  nombrePersona: string;
  estadoOrden: string;
  idCliente: number;
  tipoOrden: boolean;
  idEmpleado: number;
}

declare global {
  interface Window {
    MercadoPago?: any;
  }
}

@Component({
  selector: 'app-pag-pago',
  templateUrl: './pag-pago.component.html',
  styleUrls: ['./pag-pago.component.css']
})
export class PagPagoComponent implements OnInit {
  carrito: CarritoItem[] = [];
  response: ResponsePerfil[] = [];
  total = 0;
  modalRef?: BsModalRef;
  editarDireccion = false;
  accessToken = 'APP_USR-8616992314923590-071020-832fbc16e1ef2df68629c19f566ac582-1982564973';
  publicKey = 'APP_USR-efd29bc2-d371-4e7b-9d59-a29a031307e3';
  nombre = '';
  email = '';
  direccion = '';
  cargandoPago = false;
  private subscription = new Subscription();
  private pagoProcesado = false;

  constructor(
    private _perfilService: PerfilService,
    private _router: Router,
    private _carritoService: CarritoService,
    private modalService: BsModalService,
    private _ordenService: OrdenService
  ) {}

  ngOnInit(): void {
    this.subscription.add(this._carritoService.listarCarrito().subscribe(carrito => {
      this.carrito = carrito;
      this.total = this.calcularTotal(carrito);
    }));

    this.cargarDatosCliente();

    const params = new URLSearchParams(window.location.search);
    if (this.hayPagoExitoso(params) && !this.pagoProcesado) {
      console.log('Pago aprobado detectado en la URL:', window.location.search);
      void this.procesarPagoExitoso();
    }
  }
  volverInicio(): void {
    this._router.navigate(['/carrito']);
  }


  volverTienda(): void {
    this._router.navigate(['']);
  }

  calcularTotal(carrito: CarritoItem[]): number {
    return carrito.reduce((acc, item) => acc + (item.producto.precioUnitario * item.cantidad), 0);
  }

  private obtenerCarritoActual(): CarritoItem[] {
    if (this.carrito?.length) {
      return this.carrito;
    }

    if (this._carritoService.listaProducto?.length) {
      this.carrito = this._carritoService.listaProducto;
      this.total = this.calcularTotal(this.carrito);
      return this.carrito;
    }

    const carritoJson = localStorage.getItem('carrito-compras');
    if (!carritoJson) {
      return [];
    }

    try {
      const carritoPersistido = JSON.parse(carritoJson);
      if (Array.isArray(carritoPersistido)) {
        this.carrito = carritoPersistido;
        this.total = this.calcularTotal(this.carrito);
        return this.carrito;
      }
    } catch (error) {
      console.warn('No se pudo leer el carrito persistido', error);
    }

    return [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  abrirModalPago(template: TemplateRef<any>): void {
    this.editarDireccion = false;
    this.cargarDatosCliente();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  toggleEditarDireccion(): void {
    this.editarDireccion = !this.editarDireccion;
  }

  cargarDatosCliente(): void {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const nombreSesion = sessionStorage.getItem('nombrePersona') || sessionStorage.getItem('nombre') || '';
    const emailSesion = sessionStorage.getItem('email') || sessionStorage.getItem('correo') || '';
    const direccionSesion = sessionStorage.getItem('direccion') || '';

    this.nombre = nombreSesion;
    this.email = emailSesion;
    this.direccion = direccionSesion;

    if (!idUsuario) {
      return;
    }

    this._perfilService.getDetalle(idUsuario).subscribe({
      next: (data: ResponsePerfil[]) => {
        const perfil = data?.[0];
        if (perfil) {
          this.nombre = nombreSesion || perfil.nombrePersona || '';
          this.email = emailSesion || perfil.email || '';
          this.direccion = direccionSesion || perfil.direccion || '';
          this.response = data;
        }
      },
      error: () => {
        console.warn('No se pudo cargar el perfil del usuario.');
      }
    });
  }

  limpiarDatosFormulario(): void {
    this.nombre = sessionStorage.getItem('nombrePersona') || sessionStorage.getItem('nombre') || '';
    this.email = sessionStorage.getItem('email') || sessionStorage.getItem('correo') || '';
    this.direccion = sessionStorage.getItem('direccion') || '';
  }

  construirPayloads() {
    const cliente = {
      nombre: this.nombre,
      email: this.email,
      direccion: this.direccion,
      idUsuario: sessionStorage.getItem('idUsuario') || null
    };

    const productos = this.carrito.map(item => ({
      idProducto: item.producto.idProducto,
      nombreProducto: item.producto.nombreProd,
      cantidad: item.cantidad,
      precioUnitario: item.producto.precioUnitario,
      subtotal: item.producto.precioUnitario * item.cantidad
    }));

    return {
      cliente,
      productos
    };
  }

  private normalizarTexto(valor: string): string {
    return valor
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private generarCodigoOrden(nombreProducto: string): string {
    const nombrePersona = this.normalizarTexto(this.nombre || 'cliente') || 'cliente';
    const producto = this.normalizarTexto(nombreProducto || 'producto') || 'producto';
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `ORDEN-${nombrePersona}-${producto}-${fecha}`;
  }

  hayPagoExitoso(params: URLSearchParams): boolean {
    const status = params.get('status')?.toLowerCase();
    const collectionStatus = params.get('collection_status')?.toLowerCase();
    const paymentStatus = params.get('payment_status')?.toLowerCase();

    return ['approved', 'success', 'paid'].includes(status || '')
      || ['approved', 'success', 'paid'].includes(collectionStatus || '')
      || ['approved', 'success', 'paid'].includes(paymentStatus || '');
  }

  private obtenerNombrePersonaSesion(): string {
    return sessionStorage.getItem('nombrePersona') || this.nombre || 'Cliente';
  }

  private async registrarOrdenesSecuencialmente(estadoOrdenParam: string = 'ACTIVO'): Promise<{ exitosos: number; fallidos: number; errores: string[] }> {
    const carritoActual = this.obtenerCarritoActual();
    if (!carritoActual.length) {
      return { exitosos: 0, fallidos: 0, errores: [] };
    }

    const resultados = {
      exitosos: 0,
      fallidos: 0,
      errores: [] as string[]
    };

    const idCliente = Number(sessionStorage.getItem('idUsuario') || '0');
    const idEmpleado = Number(sessionStorage.getItem('idEmpleado') || '0');
    const fechaOrden = new Date().toISOString();
    const fechaRequerido = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();

    for (const item of carritoActual) {
      const payload: RequestVOrdenPayload = {
        idOrden: 0,
        nombrePersona: this.obtenerNombrePersonaSesion(),
        fechaOrden,
        fechaRequerido,
        estadoOrden: estadoOrdenParam,
        nombreProd: item.producto.nombreProd,
        precioUnitario: item.producto.precioUnitario,
        codigoOrden: this.generarCodigoOrden(item.producto.nombreProd),
        cantidad: item.cantidad,
        idCliente,
        tipoOrden: true,
        idEmpleado
      };

      try {
        console.log('Enviando orden al backend (estado:', estadoOrdenParam, '):', payload);
        await firstValueFrom(this._ordenService.create(payload as any));
        resultados.exitosos += 1;
      } catch (error: any) {
        resultados.fallidos += 1;
        resultados.errores.push(`Producto ${item.producto.nombreProd}: ${error?.message || 'Error desconocido'}`);
        console.warn('Error al enviar item de carrito al backend:', item.producto.nombreProd, error);
      }
    }

    return resultados;
  }

  private async procesarPagoExitoso(): Promise<void> {
    const carritoActual = this.obtenerCarritoActual();
    if (this.pagoProcesado || !carritoActual.length) {
      return;
    }

    this.pagoProcesado = true;
    this.carrito = carritoActual;
    this.total = this.calcularTotal(carritoActual);

    try {
      await this.registrarOrdenesSecuencialmente();
      this._carritoService.limpiarCarrito();

      // Limpiar la marca de orden creada para permitir futuras operaciones
      sessionStorage.removeItem('ordenCreada');

      await Swal.fire({
        title: '¡Pago confirmado!',
        text: 'Tu compra fue registrada correctamente y serás redirigido al inicio.',
        imageUrl: 'assets/img/Empresa.jpg',
        imageWidth: 180,
        imageHeight: 180,
        showConfirmButton: false,
        timer: 2200
      });

      this._router.navigate(['']);
    } catch (error: any) {
      console.error('Error al registrar las órdenes después del pago', error);
      await Swal.fire({
        icon: 'error',
        title: 'Pago recibido pero no se completó la orden',
        text: 'Ocurrió un error al guardar tu compra. Intenta nuevamente.'
      });
      this._router.navigate(['']);
    }
  }

  async continuarPago(): Promise<void> {
    const carritoActual = this.obtenerCarritoActual();
    if (!carritoActual.length) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'Agrega productos antes de continuar con el pago.'
      });
      return;
    }

    this.carrito = carritoActual;
    this.total = this.calcularTotal(carritoActual);

    if (!this.email || !this.nombre) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Ingresa tu nombre y correo para continuar.'
      });
      return;
    }

    this.cargandoPago = true;

    try {
      const preferencePayload = {
        items: carritoActual.map(item => ({
          title: item.producto.nombreProd,
          quantity: item.cantidad,
          unit_price: item.producto.precioUnitario
        })),
        payer: {
          email: this.email,
          name: this.nombre,
          surname: this.nombre
        },
        back_urls: {
          success: 'http://localhost:4200/pasarela?status=success',
          failure: 'http://localhost:4200/pasarela?status=failure',
          pending: 'http://localhost:4200/pasarela?status=pending'
        },
        payment_methods: {
          installments: 6
        },
        sandbox: true,
        external_reference: sessionStorage.getItem('idUsuario') || undefined
      };

      // Enviar cada item del carrito uno por uno al backend antes de ir a Mercado Pago.
      const resultados = await this.registrarOrdenesSecuencialmente('PENDIENTE');
      if (resultados.exitosos === 0) {
        this.cargandoPago = false;
        await Swal.fire({
          icon: 'error',
          title: 'No se pudo crear ninguna orden',
          text: 'Intenta de nuevo más tarde o revisa tu conexión.'
        });
        return;
      }
      if (resultados.fallidos > 0) {
        await Swal.fire({
          icon: 'warning',
          title: 'Algunas órdenes no se pudieron crear',
          html: `Se crearon ${resultados.exitosos} ítems, pero fallaron ${resultados.fallidos}. Verifica la consola para más detalles.`
        });
      }

      this.modalRef?.hide();

      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(preferencePayload)
      });

      const preference = await response.json();
      const checkoutUrl = preference?.init_point || preference?.sandbox_init_point || preference?.response?.init_point || preference?.response?.sandbox_init_point;

      if (!checkoutUrl) {
        const detail = preference?.message || preference?.error || 'Sin detalle del servidor.';
        throw new Error(`No se recibió la URL de checkout de Mercado Pago. Detalle: ${detail}`);
      }

      const payload = this.construirPayloads();
      console.log('Datos del cliente:', JSON.stringify(payload.cliente));
      console.log('Productos preparados:', JSON.stringify(payload.productos));

      this.cargandoPago = false;
      window.location.href = checkoutUrl;
    } catch (error: any) {
      this.cargandoPago = false;
      console.error('Error al crear la preferencia de Mercado Pago', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar el pago',
        text: error?.message || 'No se pudo iniciar la pasarela de Mercado Pago.'
      }).then(() => {
        this._router.navigate(['/pasarela']);
      });
    }
  }

  mostrarEstadoPago(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2500
    }).then(() => {
      this._router.navigate(['/pasarela']);
    });
  }
}