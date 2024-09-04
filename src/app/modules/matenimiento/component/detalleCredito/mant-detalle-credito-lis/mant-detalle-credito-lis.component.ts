import { Component, TemplateRef } from '@angular/core';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoResponseVDCredito.model';
import { DetalleCreditoService } from '../../../service/detalleCredito/detalle-credito.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ResquestVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoRequestVDCredito.model';

@Component({
  selector: 'app-mant-detalle-credito-lis',
  templateUrl: './mant-detalle-credito-lis.component.html',
  styleUrls: ['./mant-detalle-credito-lis.component.css']
})
export class MantDetalleCreditoLisComponent {
  responseDetalleCredito : ResponseVDetalleCredito []=[];
  response: ResponseVDetalleCredito = new ResponseVDetalleCredito();
  DetalleCreditoSelect : ResquestVDetalleCredito = new ResquestVDetalleCredito()
  modalRef? : BsModalRef;
  titleModal : string = ""
  accionModal : number = 0
  constructor (
    private _router:Router,
    private modalService: BsModalService,
    private _DetalleCreditoService: DetalleCreditoService

  )
  {

  }
  ngOnInit():void
  {
    this.listarDetalleCredito()
  }
  listarDetalleCredito()
  {
    this._DetalleCreditoService.getAll().subscribe({
      next:(data: ResponseVDetalleCredito[])=>{
        this.responseDetalleCredito = data;
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
  crearDetalleCredito(template:TemplateRef<any>)
  {
    this.titleModal= "Nuevo DetalleCredito"
    this.DetalleCreditoSelect = new ResponseVDetalleCredito()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)
  }
  editarDetalleCredito(template:TemplateRef<any>,DetalleCredito:ResponseVDetalleCredito)
  {
    this.titleModal= "Actaulizar DetalleCredito"
    this.DetalleCreditoSelect = DetalleCredito
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
  eliminarDetalleCredito(id:number)
  {
    let result = confirm("Estas seguro de Eliminar")
    if(result)
    {
      this._DetalleCreditoService.delete(id).subscribe(
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
      this.listarDetalleCredito()
    }
  }
}
