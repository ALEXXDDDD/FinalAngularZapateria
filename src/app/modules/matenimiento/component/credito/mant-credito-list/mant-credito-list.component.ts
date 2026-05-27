import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseVCliente } from '../../../models/cliente/list-cliente-response.model';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { ClienteService } from '../../../service/cliente/cliente.service';
import { OrdenService } from '../../../service/orden/orden.service';
import { ResponseVWCliente } from '../../../models/cliente/response-VMCliente.model';
import { alert_error } from 'src/app/funcionts/general.funcionts';
import { ResponseOrden } from '../../../models/orden/orden-response.model';
import { CreditoService } from '../../../service/credito/credito.service';
import { VistCredito } from '../../../models/credito/credito-responseVist.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { RequestCredito } from '../../../models/credito/credito-requestCredito.model';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';
import { ResponseVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoResponseVDCredito.model';

@Component({
  selector: 'app-mant-credito-list',
  templateUrl: './mant-credito-list.component.html',
  styleUrls: ['./mant-credito-list.component.css']
})
export class MantCreditoListComponent implements OnInit {
  responseCliente:ResponseVWCliente[]=[]
  responseOrden:ResponseOrden[]=[]
 
  responseVistCredito : VistCredito[] = []
  vistCredito :VistCredito= new VistCredito();
  modalRef? : BsModalRef;
  requestFiltro: RequestFiltroNombre = new RequestFiltroNombre()
  detalleCreditoSelect:ResponseVDetalleCredito = new ResponseVDetalleCredito()
  titleModal : string = ""
  creditoSelect : RequestCredito = new RequestCredito()
  mostrarListaCompleta: boolean = true;
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  accionModal : number = 0
  tablaActual: string = 'conAccion';
  constructor
  (
    private _clienteService:ClienteService,
    private _ordenService:OrdenService,
    private modalService: BsModalService,
    private _creditoService:CreditoService
  )
  {

  }
  ngOnInit(): void {
    this.listarCredito()
   
  }
  listarCliente()
  {
    this._clienteService.getAll().subscribe(
      {
        next:(data:ResponseVWCliente[])=>{this.responseCliente=data},
        error:(error)=>{alert_error("No existe ni un cliente")},
        complete:()=>{}
      }
    )
  }
  listarOrden()
  {
    this._ordenService.getAll().subscribe(
      {
        next:(data:ResponseOrden[])=>{this.responseOrden=data},
        error:(error)=>{alert_error("No existe ni un cliente")},
        complete:()=>{}
      }
    )
  }
  creardetalleCredito(template: TemplateRef<any>)
  {
    this.titleModal ="Nuevo Pago Detalle Credito"
    this.detalleCreditoSelect = new ResponseVDetalleCredito()
    this.accionModal = AcciontConstants.crear
    this.openModal(template);

  }
  mostrarTabla(tabla: string) {
    this.tablaActual = tabla;
  }
  listarCredito()
  {
    this._creditoService.getAll().subscribe(
      {
        next:(data:VistCredito[])=>{this.responseVistCredito=data; console.log(data)},
        error:()=>{},
        complete:()=>{}
      }
    )
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  crearCredito(template:TemplateRef<any>)
  {
    this.titleModal= "Nuevo Credito"
    this.creditoSelect = new RequestCredito()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)
  }
  editarCredito(template:TemplateRef<any>,Credito:VistCredito)
  {
    this.titleModal= "Actaulizar Credito"
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
  listarDetalleCredito(template:TemplateRef<any>,Credito:VistCredito,id:number)
  {
    debugger
    this.titleModal= "Actaulizar Credito"
    this.vistCredito = Credito
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
 
 
  eliminarCredito(id:number)
  {
    let result = confirm("Estas seguro de Eliminar")
    if(result)
    {
      this._creditoService.delete(id).subscribe(
        {
          next:(data:number)=>
          {
            alert("Se elimino Correctamente")
          },
          error:()=>{},
          complete:()=>{}
        }
      )
    }
  }
  listarDetalle(nombreCliente:number)
  {
    this._creditoService.getDetalleCredito(nombreCliente).subscribe(
      {
        next:()=>{},
        error:()=>{},
        complete:()=>{}
      }
    )
  }
  filtrarOrdenAcIna(nombre:string)
  {



    this.nombreRol.nombre = nombre;

    this._creditoService.genericCreditoDisponible(this.nombreRol).subscribe({
      next: (data: VistCredito[]) => {
        this.responseVistCredito = data; // Actualiza la lista con la respuesta filtrada
        console.log("Ordenes Activos o INACTIVOS", data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => { }
    });
  }
  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
     
    }
  }
 

}
