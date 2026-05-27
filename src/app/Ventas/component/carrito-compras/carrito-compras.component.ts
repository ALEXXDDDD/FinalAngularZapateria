import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { CarritoItem } from 'src/app/modules/matenimiento/models/carritoItem/carritoItem.model';
import { RequestActualizacionDireccion } from 'src/app/modules/matenimiento/models/cliente/request-actualizacionUsuario.model';
import { ResponseUsuario } from 'src/app/modules/matenimiento/models/usuario/responseUsuario.models';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

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
  direccionSelect:RequestActualizacionDireccion = new RequestActualizacionDireccion
  titleModal : string = ""
  
  accionModal : number = 1
  carrito:CarritoItem[]=[]
  constructor(
    
    private _carritoService:CarritoService,
    
    private modalService: BsModalService,
    
  )
  {

  }
  ngOnInit(): void {
    this.totalPrecios= this._carritoService.sumarPrecios()
    this.cargarCarrito()
    this.actualizarTotal();
    this._carritoService.listarCarrito().subscribe(
      {
        next:(data)=>{ this.carrito=data, console.log("datos",data)} 
       
      }
    )
    this.totalPrecios = this._carritoService.sumarPrecios();
   
  }
  cargarCarrito() {
    this.subscriptions.push(
      this._carritoService.listarCarrito().subscribe(data => {
        this.carrito = data;
        this.total = this._carritoService.obtenerTotal();
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


}
