import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseProduccion } from '../../../models/Produccion/produccion-response.model';
import { ResponseVWProduccion } from '../../../models/Produccion/produccion-reponseVW.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ProduccionService } from '../../../service/produccion/produccion.service';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-detall-produccion-list',
  templateUrl: './mant-detall-produccion-list.component.html',
  styleUrls: ['./mant-detall-produccion-list.component.css']
})
export class MantDetallProduccionListComponent implements OnInit {
  responseProduccion : ResponseProduccion []=[];
  response: ResponseProduccion = new ResponseProduccion();
  ProduccionSelect : ResponseVWProduccion = new ResponseVWProduccion()
  responseVWProduccion: ResponseVWProduccion = new ResponseVWProduccion();
  modalRef? : BsModalRef;
  titleModal : string = ""
  accionModal : number = 0
  constructor (
    private _router:Router,
    private modalService: BsModalService,
    private _ProduccionService: ProduccionService

  )
  {

  }
  ngOnInit():void
  {
    this.listarProduccion()
  }
  listarProduccion()
  {
    this._ProduccionService.getAll().subscribe({
      next:(data: ResponseProduccion[])=>{
        this.responseProduccion = data;
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
  crearProduccion(template:TemplateRef<any>)
  {
    this.titleModal= "Nuevo Produccion"
    this.ProduccionSelect = new ResponseVWProduccion()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)
  }
  editarProduccion(template:TemplateRef<any>,Produccion:ResponseVWProduccion)
  {
    this.titleModal= "Actaulizar Produccion"
    this.ProduccionSelect = Produccion
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
  eliminarProduccion(id:number)
  {
    let result = confirm("Estas seguro de Eliminar")
    if(result)
    {
      this._ProduccionService.delete(id).subscribe(
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
      this.listarProduccion()
    }
  }
}
