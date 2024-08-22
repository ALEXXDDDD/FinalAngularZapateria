import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseModelo } from '../../../models/modelo/modelo-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-modelo-list',
  templateUrl: './mant-modelo-list.component.html',
  styleUrls: ['./mant-modelo-list.component.css']
})
export class MantModeloListComponent implements OnInit {
  responseModelo : ResponseModelo[]=[]
  selectModelo : ResponseModelo = new ResponseModelo()
  modalRef?: BsModalRef
  titleModal : string = ""
  accionModal : number = 0
  constructor(
    private modalService: BsModalService,
    private _modeloService : ModeloService
    
  )
  {

  }
  ngOnInit(): void {
    this.listarModelos()
  }
  listarModelos()
  {
      this._modeloService.getAll().subscribe(
        {
          next:(data:ResponseModelo[])=>{
            this.responseModelo = data
            console.log("Modelo",data)
          },
          error:()=>{},
          complete:()=>{}
        }
      )
  }
  openModal(template:TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template)
  }
  crearModelo(template:TemplateRef<any>)
  {
    this.titleModal = "Crear Modelo"
    this.selectModelo = new ResponseModelo()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)
    
  }
  editaModelo(template:TemplateRef<any>, modelo:ResponseModelo)
  {
    this.titleModal= "Actaulizar Modelo"
    this.selectModelo = modelo
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
  eliminarModelo(id:number)
  {
    let result = confirm("Estas seguro de Eliminar")
    if(result)
    {
      this._modeloService.delete(id).subscribe(
        {
          next:() => {
            alert("Se eleimino Correctamente ")
          },
          complete:() => {},
          error:(error) => {
            alert("Ocurrio un error")
          }
        }
      )
    }
  }
  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this.listarModelos()
    }
  }

}
