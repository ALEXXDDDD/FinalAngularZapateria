import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CarritoItem } from 'src/app/modules/matenimiento/models/carritoItem/carritoItem.model';
import { Subscription } from 'rxjs';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { ResponsePerfil } from 'src/app/modules/matenimiento/models/perfil/perfil-response.model';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { OrdenService } from 'src/app/modules/matenimiento/service/orden/orden.service';

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
  accessToken = 'APP_USR-8179075883826310-091208-fc80cedea5bf686dcd6d59e7a1bb9530-1935100815';
  nombre = '';
  email = '';
  direccion = '';
  cargandoPago = false;
  private subscription = new Subscription();

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

    this.limpiarDatosFormulario();

    if (!idUsuario) {
      return;
    }

    this._perfilService.getDetalle(idUsuario).subscribe({
      next: (data: ResponsePerfil[]) => {
        const perfil = data?.[0];
        if (perfil) {
          this.nombre = perfil.nombrePersona || '';
          this.email = perfil.email || '';
          this.direccion = perfil.direccion || '';
          this.response = data;
        } else {
          this.limpiarDatosFormulario();
        }
      },
      error: () => {
        this.limpiarDatosFormulario();
        console.warn('No se pudo cargar el perfil del usuario.');
      }
    });
  }

  limpiarDatosFormulario(): void {
    this.nombre = '';
    this.email = '';
    this.direccion = '';
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

  async continuarPago(): Promise<void> {
    if (!this.carrito.length) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'Agrega productos antes de continuar con el pago.'
      });
      return;
    }

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
        items: this.carrito.map(item => ({
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
          success: 'http://localhost:4200/pasarela',
          failure: 'http://localhost:4200/pasarela',
          pending: 'http://localhost:4200/pasarela'
        },
        payment_methods: {
          installments: 6
        }
      };

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