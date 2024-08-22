import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseVwDetalleProduccion } from '../../../models/DetalleProduccion/DetallleProduccion-responseVW.model';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetalleProduccionService } from '../../../service/detalleProduccion/detalle-produccion.service';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-empl-area-list',
  templateUrl: './mant-empl-area-list.component.html',
  styleUrls: ['./mant-empl-area-list.component.css']
})
export class MantEmplAreaListComponent implements OnInit {

  /**
   * TODO: Declaracion de Variables
   */
  
  empleadoAreaSelect: ResponseVwDetalleProduccion = new ResponseVwDetalleProduccion()
  responseDetProduccio : ResponseVwDetalleProduccion[]=[];
  accionModal : number = 0
  modalRef!: BsModalRef;
  titleModal : String = ""
  constructor
  (
    private router:Router,
    private  modalService : BsModalService,
    private _detalleService : DetalleProduccionService
  )
  
  {

  }

  ngOnInit(): void {
    this.ListarEmpleadoArea();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ListarEmpleadoArea()
  {
    this._detalleService.getAll().subscribe
    (
      {
        next : (data:ResponseVwDetalleProduccion[]) => {
          this.responseDetProduccio = data 
        }
      }
    )
  }
  editarAreaEmpleado(template:TemplateRef<any>,EmpleadoArea:ResponseVwDetalleProduccion)
  {
    this.titleModal= "Nuevo Area "
    this.empleadoAreaSelect = EmpleadoArea
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
  
  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this.ListarEmpleadoArea()
    }
  }
}
