import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { CarritoItem } from 'src/app/modules/matenimiento/models/carritoItem/carritoItem.model';
import { RequestActualizacionDireccion } from 'src/app/modules/matenimiento/models/cliente/request-actualizacionUsuario.model';
import { ResponseUsuario } from 'src/app/modules/matenimiento/models/usuario/responseUsuario.models';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ProductoService } from 'src/app/modules/matenimiento/service/producto/producto.service';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit{
  private subscriptions: Subscription[] = [];
  modalRef?: BsModalRef;
  totalPrecios?: number ;
  total: number = 0;
  // UsuarioSelect :ResponseCliente = new ResponseCliente() // Mandar para el register 
  usuarioSelect :ResponseUsuario = new ResponseUsuario()
  productoSelect: ResponseProducto = new ResponseProducto();
  direccionSelect:RequestActualizacionDireccion = new RequestActualizacionDireccion
  titleModal : string = ""
  
  accionModal : number = 1
  carrito:CarritoItem[]=[]
  productosDisponibles: ResponseProducto[] = [];
  cargandoProductos = false;
  errorProductos = false;
  constructor(
    
    private _carritoService:CarritoService,
    private router: Router,
    private modalService: BsModalService,
    private productoService: ProductoService
  )
  {

  }
  ngOnInit(): void {
    this.totalPrecios= this._carritoService.sumarPrecios()
    this.cargarCarrito()
    this.actualizarTotal();
    this.totalPrecios = this._carritoService.sumarPrecios();
    this.cargarProductosDisponibles();
   
  }
  cargarCarrito() {
    this.subscriptions.push(
      this._carritoService.listarCarrito().subscribe(data => {
        this.carrito = data;
        this.actualizarTotal();
      })
    );
  }
  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this._carritoService.listarCarrito()
    }
  }
  actualizarTotal() {
    this.total = this.carrito.reduce((acc, item) => acc + (item.producto.precioUnitario * item.cantidad), 0);
  }

  irAPagar(): void {
    if (!this.carrito || this.carrito.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'Agrega productos antes de continuar al pago.'
      });
      return;
    }

    this.router.navigate(['/pasarela']);
  }
 
  eliminarProducto(item: CarritoItem): void {
    // Llamar al servicio para eliminar el producto
    this._carritoService.removeProducto(item.producto.idProducto);

    // Eliminar el producto del carrito
    this.carrito = this.carrito.filter(carritoItem => carritoItem.producto.idProducto !== item.producto.idProducto);

    // Actualizar el total
    this.actualizarTotal();
  }

  cambiarCantidad(item:CarritoItem ,cantidad:number):void
  {
    this.actualizarTotal();
    this._carritoService.editarCantidad(item.producto.idProducto,cantidad)
  }
  agregar1(item:CarritoItem):void
  {
    this._carritoService.editarCantidad(item.producto.idProducto,++item.cantidad)
    this.actualizarTotal();
    

  }
  quitar1(item:CarritoItem ):void
  {
    if(item.cantidad>1)
      {
        this._carritoService.editarCantidad(item.producto.idProducto,--item.cantidad)
        this.actualizarTotal();
       
      }
  }
  realizarEnvio(template: TemplateRef<any>)
  {
    this.titleModal ="Nuevo Credito"
    this.accionModal = AcciontConstants.crear
    this.openModal(template);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  cargarProductosDisponibles(): void {
    this.cargandoProductos = true;
    this.errorProductos = false;
    this.productoService.getAll().subscribe({
      next: productos => {
        this.productosDisponibles = productos || [];
        this.cargandoProductos = false;
      },
      error: () => {
        this.errorProductos = true;
        this.cargandoProductos = false;
      }
    });
  }

  agregarProducto(producto: ResponseProducto): void {
    if ((producto.stock ?? 0) <= 0) {
      Swal.fire('Sin stock', 'Este producto no está disponible.', 'warning');
      return;
    }

    this._carritoService.addProducto(producto);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${producto.nombreProd} se agregó al carrito`,
      showConfirmButton: false,
      timer: 1800
    });
  }

  verDetalle(template: TemplateRef<any>, producto: ResponseProducto): void {
    this.productoSelect = producto;
    this.titleModal = 'Detalle del producto';
    this.accionModal = AcciontConstants.detalle;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered product-detail-modal',
      ignoreBackdropClick: false
    });
  }

  getImagenUrl(fotografia: string): string {
    if (!fotografia) {
      return 'assets/img/img_Template/1.png';
    }
    const imagen = fotografia.trim();
    if (imagen.startsWith('data:') || /^https?:\/\//i.test(imagen) || imagen.startsWith('assets/') || imagen.startsWith('/assets/')) {
      return imagen;
    }
    return `data:image/jpeg;base64,${imagen.replace(/\s/g, '')}`;
  }


}
