import { Component, TemplateRef } from '@angular/core';
import { ResponseVWEmpleado } from '../../../models/empleado/empleadoVW-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../../service/empleado/empleado.service';
import { ResponseEmpleado } from '../../../models/empleado/response-list-empleado.models';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-empleado-list',
  templateUrl: './mant-empleado-list.component.html',
  styleUrls: ['./mant-empleado-list.component.css']
})
export class MantEmpleadoListComponent {

  responseEmpleado : ResponseEmpleado []=[];
  response: ResponseEmpleado = new ResponseEmpleado();
  empleadoSelect : ResponseVWEmpleado = new ResponseVWEmpleado()
  responseVWEmpleado: ResponseVWEmpleado = new ResponseVWEmpleado();
  modalRef? : BsModalRef;
  titleModal : string = ""
  accionModal : number = 0
  constructor (
    private _router:Router,
    private modalService: BsModalService,
    private _empleadoService: EmpleadoService

  )
  {

  }
  ngOnInit():void
  {
    this.listarEmpleado()
  }
  listarEmpleado()
  {
    this._empleadoService.getAll().subscribe({
      next:(data: ResponseEmpleado[])=>{
        this.responseEmpleado = data;
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
  crearEmpleado(template:TemplateRef<any>)
  {
    this.titleModal= "Nuevo Empleado"
    this.empleadoSelect = new ResponseVWEmpleado()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)
  }
  editarEmpleado(template:TemplateRef<any>,Empleado:ResponseVWEmpleado)
  {
    this.titleModal= "Actaulizar Empleado"
    this.empleadoSelect = Empleado
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
  eliminarEmpleado(id:number)
  {
    let result = confirm("Estas seguro de Eliminar")
    if(result)
    {
      this._empleadoService.delete(id).subscribe(
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
      this.listarEmpleado()
    }
  }
}
