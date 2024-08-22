import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseVWProduccion } from '../../../models/Produccion/produccion-reponseVW.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestVWProduccion } from '../../../models/Produccion/produccion-requestVW.model';
import { ProduccionService } from '../../../service/produccion/produccion.service';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseProduccion } from '../../../models/Produccion/produccion-response.model';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { ProductoService } from '../../../service/producto/producto.service';

@Component({
  selector: 'app-mant-produccion-list',
  templateUrl: './mant-produccion-list.component.html',
  styleUrls: ['./mant-produccion-list.component.css']
})
export class MantProduccionListComponent implements OnInit{

  Produccion : ResponseProduccion []=[]
  responseProducto : ResponseProducto []=[]
  modalRef?:BsModalRef
  title:string=""
  accionModal:number=0
  selectProduccion : ResponseProduccion = new ResponseProduccion()
  envioProduccion : RequestVWProduccion  = new RequestVWProduccion()

  constructor 
  (
    private _ProduccionService : ProduccionService,
    private _productoService : ProductoService,
    private _modalService : BsModalService
  )
  {

  }
  ngOnInit(): void {
    this.listarProduccion()
  }
  listarProduccion ()
  {
    this._ProduccionService.getAll().subscribe
    (
      {
        next:(data:ResponseProduccion[])=>
          {
            this.Produccion=data
          },
        error:(error)=>{
          alert_error("No se pudo cargar la data ")
        },
        complete:()=>{}
      }
    )
  }
  crearProduccion(template:TemplateRef<any>)
  {
    this.title = "Registrar Nueva Produccion"
    this.envioProduccion  = new RequestVWProduccion()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)

  }
  editarProduccion(template:TemplateRef<any>,Produccion:RequestVWProduccion)
  {
    this.title=" Salida"
    this.envioProduccion = Produccion
    this.accionModal = AcciontConstants.editar
    this.openModal(template)

  }
  openModal( template : TemplateRef<any>)
  {
    this.modalRef = this._modalService.show(template,Object.assign({},{class:"gray modal-lg"}))
  }
  listarProductos()
  {
    this._productoService.getAll().subscribe({
      next: (data:ResponseProducto[])=>{
        this.responseProducto = data 
        console.log(data)
      },
      error: (error)=>{
        alert("Ocurrio Un error ")
      },      
      complete: ()=>{}
    })
  }
  getCloseModal(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
      {
        this.listarProduccion()
      }
  }
}