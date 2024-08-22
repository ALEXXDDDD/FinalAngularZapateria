import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseVWSalidaMaterial } from '../../../models/salidaMaterial/responseVWSalidaMaterial.model';
import { RequestVWSalidaMaterial } from '../../../models/salidaMaterial/requestVWSalidaMaterial.model';
import { SalidaMaterialService } from '../../../service/salidaMaterial/salida-material.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseListSalidaMaterial } from '../../../models/salidaMaterial/responseListVWSalidaMaterial.model';

@Component({
  selector: 'app-mant-salida-material-list',
  templateUrl: './mant-salida-material-list.component.html',
  styleUrls: ['./mant-salida-material-list.component.css']
})
export class MantSalidaMaterialListComponent implements OnInit{

  salidaMaterial : ResponseVWSalidaMaterial []=[]
  modalRef?:BsModalRef
  title:string=""
  accionModal:number=0
  selectSalidaMaterial : ResponseListSalidaMaterial = new ResponseListSalidaMaterial()
  envioSalidaMaterial : RequestVWSalidaMaterial  = new RequestVWSalidaMaterial()

  constructor 
  (
    private _salidaMaterialService : SalidaMaterialService,
    private _modalService : BsModalService
  )
  {

  }
  ngOnInit(): void {
    this.listarSalidaMaterial()
    
  }
  listarSalidaMaterial ()
  {
    this._salidaMaterialService.getAll().subscribe
    (
      {
        next:(data:ResponseVWSalidaMaterial[])=>
          {
            console.log("Datos de la salida De Material", data)
            this.salidaMaterial=data
            
          },
        error:(error)=>{
          alert_error("No se pudo cargar la data ")
        },
        complete:()=>{}
      }
    )
  }
  crearSalidaMateria(template:TemplateRef<any>)
  {
    this.title = "Registrar Nueva Salida"
    this.envioSalidaMaterial  = new RequestVWSalidaMaterial()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)

  }
  editarSalidaMaterial(template:TemplateRef<any>,SalidaMaterial:RequestVWSalidaMaterial)
  {
    this.title=" Salida"
    this.envioSalidaMaterial = SalidaMaterial
    this.accionModal = AcciontConstants.editar
    this.openModal(template)

  }
  openModal( template : TemplateRef<any>)
  {
    this.modalRef = this._modalService.show(template,Object.assign({},{class:"gray modal-lg"}))
  }
  getCloseModal(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
      {
        this.listarSalidaMaterial()
      }
  }
}
