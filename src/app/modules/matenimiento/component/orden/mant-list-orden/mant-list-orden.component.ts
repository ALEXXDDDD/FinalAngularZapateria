import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseOrden } from '../../../models/orden/orden-response.model';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { OrdenService } from '../../../service/orden/orden.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { RequestUnidad } from '../../../models/unidad/p/unidad-request.model';

@Component({
  selector: 'app-mant-list-orden',
  templateUrl: './mant-list-orden.component.html',
  styleUrls: ['./mant-list-orden.component.css']
})
export class MantListOrdenComponent implements OnInit {
  responseOrden : ResponseOrden []=[];
  response: ResponseOrden = new ResponseOrden();
  OrdenSelect : ResponseListOrden = new ResponseListOrden()
  UnidadSelect : RequestUnidad = new RequestUnidad()
  responseVWOrden: ResponseListOrden = new ResponseListOrden();
  modalRef? : BsModalRef;
  titleModal : string = ""
  accionModal : number = 0
  constructor (
    private _router:Router,
    private modalService: BsModalService,
    private _OrdenService: OrdenService

  )
  {

  }
  ngOnInit():void
  {
    this.listarOrden()
  }
  listarOrden()
  {
    this._OrdenService.getAll().subscribe({
      next:(data: ResponseOrden[])=>{
        this.responseOrden = data;
        console.log(data)
      },
      error:()=>{},
      complete:()=>{}
      }

    )
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  crearOrden(template:TemplateRef<any>)
  {
    this.titleModal= "Nuevo Orden"
    this.OrdenSelect = new ResponseListOrden()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)
  }
  editarOrden(template:TemplateRef<any>,Orden:ResponseListOrden)
  {
    this.titleModal= "Actaulizar Orden"
    this.OrdenSelect = Orden
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
  crearUnidad(templateUnidad:TemplateRef<any>)
  {
    this.titleModal= "Crear Unidad"
    this.UnidadSelect = new RequestUnidad()
    this.accionModal = AcciontConstants.crear
    this.openModal(templateUnidad)
  }
  eliminarOrden(id:number)
  {
    let result = confirm("Estas seguro de Eliminar")
    if(result)
    {
      this._OrdenService.delete(id).subscribe(
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
  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this.listarOrden()
    }
  }
}
