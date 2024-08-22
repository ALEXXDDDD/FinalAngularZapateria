import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponsePersona } from '../../../models/persona/response-persona.model';
import { PersonaService } from '../../../service/persona/persona.service';
import { Router } from '@angular/router';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-mant-persona-list',
  templateUrl: './mant-persona-list.component.html',
  styleUrls: ['./mant-persona-list.component.css']
})
export class MantPersonaListComponent implements OnInit {
  persona:ResponsePersona[] =[]
  personaSelect : ResponsePersona = new ResponsePersona()
  modalRef?:BsModalRef
  title:string =""
  accionModal : number = 0
  constructor(
    private modalService : BsModalService,
    private _personaService : PersonaService,
    private _router:Router
  ){

  }
  ngOnInit(): void {
    this.listarPersona()
  }
  listarPersona()
  {
    this._personaService.getAll().subscribe({
      next:(data:ResponsePersona[])=>{
        this.persona=data
        console.log(data)
      },
      error:(error)=>{
        alert("OCURRIO UN ERROR ")
      },
      complete:()=>{}
    })
    
  }
  crearPersona (template:TemplateRef<any>)
    {
        this.title = "Crear Persona"
        this.accionModal = AcciontConstants.crear
        this.personaSelect = new ResponsePersona()
        this.openModal(template)

    }
    openModal(template:TemplateRef<any>)
    {
      this.modalRef = this.modalService.show(template)
    }
    editarPersona (template:TemplateRef<any>, persona:ResponsePersona)
    {
      this.title = "Actulizar Persona"
      this.accionModal = AcciontConstants.editar
      this.openModal(template)
    }
    eliminarPersona (id:number)
    {
      let result = confirm ("Estas Seguro de Eliminar el valor")
      if (result)
      {
        this._personaService.delete(id).subscribe(
          {
            next:(data:number)=>
            {
              alert ("Se elimino Correctamente")
            },
            error:(error)=>
            {
              alert("Ocurrio un error ¿")
            },
            complete:()=>{}

          }
        )
      }
    }
    getCloseModal(res:boolean)
    {
      this.modalRef?.hide
      if(res)
      {
        this.listarPersona()
      }
    }
  
  
 
  

}
