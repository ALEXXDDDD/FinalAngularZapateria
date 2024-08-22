import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClienteService } from '../../../service/cliente/cliente.service';
import { Router } from '@angular/router';
import { ResponseVWCliente } from '../../../models/cliente/response-VMCliente.model';
import { ResponseVCliente } from '../../../models/cliente/list-cliente-response.model';
import { ResponseUsuario } from '../../../models/usuario/responseUsuario.models';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseVCredito } from '../../../models/credito/credito-responseVCredito.model';
import { ResponseProduccion } from '../../../models/Produccion/produccion-response.model';
import { ResponseVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoResponseVDCredito.model';


@Component({
  selector: 'app-mant-cliente-list',
  templateUrl: './mant-cliente-list.component.html',
  styleUrls: ['./mant-cliente-list.component.css']
})
export class MantClienteListComponent implements OnInit {
  Usuario : ResponseUsuario[]=[]
  usuarioSelect :ResponseVCliente = new ResponseVCliente() 
  creditoSelect : ResponseVCredito = new ResponseVCredito()
  detalleCreditoSelect:ResponseVDetalleCredito = new ResponseVDetalleCredito()
  UsuarioV : ResponseVUsuario[]=[]  // Lista 
  modalRef?: BsModalRef;
  // UsuarioSelect :ResponseCliente = new ResponseCliente() // Mandar para el register 
  titleModal : string = ""
  accionModal : number = 0
  totalItems:number =0
  itemsPerPage:number=1
  // request : RequestFilterGeneric = new RequestFilterGeneric()
  myFormFilter:FormGroup
  cliente:ResponseVWCliente[] =[]
  responseVwCliente: ResponseVWCliente[] = [];
  clienteResponse:ResponseVCliente = new ResponseVCliente()
  constructor(
    private _clienteService : ClienteService,
    private _router:Router,
    private fb:FormBuilder,
    private modalService: BsModalService,
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
 
   this.listarClientes()
  }
  listarClientes()
  {
    this._clienteService.getAll().subscribe({
      next:(data:ResponseVWCliente[])=>{
        this.responseVwCliente=data
        console.log(data)
      },
      error:(error)=>{
        alert("OCURRIO UN ERROR ")
      },
      complete:()=>{}
  }
    )}
    crearCliente(template: TemplateRef<any>)
  {
    this.titleModal ="Nuevo Cliente"
    this.usuarioSelect = new ResponseVCliente()
    this.accionModal = AcciontConstants.crear
    this.openModal(template);

  }
  openModalG( template : TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template,Object.assign({},{class:"gray modal-lg"}))
  }
  crearCredito(template: TemplateRef<any>)
  {
    this.titleModal ="Nuevo Credito"
    this.creditoSelect = new ResponseVCredito()
    this.accionModal = AcciontConstants.crear
    this.openModalG(template);

  }
  creardetalleCredito(template: TemplateRef<any>)
  {
    this.titleModal ="Nuevo Pago Detalle Credito"
    this.detalleCreditoSelect = new ResponseVDetalleCredito()
    this.accionModal = AcciontConstants.crear
    this.openModalG(template);

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
      this.listarClientes()
    }
  }
}
