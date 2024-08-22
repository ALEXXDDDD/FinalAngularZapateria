import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { UsuarioService } from '../../../service/usuario/usuario.service';
import { ResponseUsuario } from '../../../models/usuario/responseUsuario.models';
import { ResponseVCliente } from '../../../models/cliente/list-cliente-response.model';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-usuario-list',
  templateUrl: './mant-usuario-list.component.html',
  styleUrls: ['./mant-usuario-list.component.css']
})
export class MantUsuarioListComponent implements OnInit {
  Usuario : ResponseUsuario[]=[]
  usuarioSelect :ResponseVCliente = new ResponseVCliente() 
  UsuarioV : ResponseVUsuario[]=[]  // Lista 
  modalRef?: BsModalRef;
  // UsuarioSelect :ResponseCliente = new ResponseCliente() // Mandar para el register 
  titleModal : string = ""
  accionModal : number = 0
  totalItems:number =0
  itemsPerPage:number=1
  // request : RequestFilterGeneric = new RequestFilterGeneric()
  myFormFilter:FormGroup

  constructor(
    private _router:Router, 
    private fb:FormBuilder,
    private modalService: BsModalService,
    private _usuarioService : UsuarioService
  ){
    this.myFormFilter = this.fb.group(
      {
        usuario: [""],
        password: [""],
        email: [""],
        nombrePersona: [""],
        tipoPersona: [""],
        direccion: [""],
        irol: [""],
        nombreRol: [""],
        idUsuario: [""],
      }
    )
  }
  ngOnInit(): void {
    this.listarUsuario()
  }
  listarUsuario()
  {
    this._usuarioService.getAll().subscribe(
      {
        next:(data:ResponseUsuario[])=>{
          this.Usuario = data
        },
        error:(error)=>{ alert("Ocurrio un Error")},
        complete:()=>{}
      }
    )
  
  }
  crearCliente(template: TemplateRef<any>)
  {
    this.titleModal ="Nuevo Cliente"
    this.usuarioSelect = new ResponseVCliente()
    this.accionModal = AcciontConstants.crear
    this.openModal(template);

  }
  editarCliente(template: TemplateRef<any>, Cliente:ResponseVCliente)
  {
    this.titleModal ="Editar Cliente"
    this.usuarioSelect = Cliente
    this.accionModal = AcciontConstants.editar
    this.openModal(template);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this.listarUsuario()
    }
  }
}
