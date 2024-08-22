import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { RolService } from '../../../service/rol.service';
import { ResponseRol } from '../../../models/rol/rol-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpHeaders } from '@angular/common/http';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestFilterGeneric } from '../../../models/genericFilterRequest.model';
import { ResponseFilterGeneric } from '../../../models/genericFilterResponse.models';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mant-rol-list',
  templateUrl: './mant-rol-list.component.html',
  styleUrls: ['./mant-rol-list.component.css']
})
export class MantRolListComponent implements OnInit {
  Rol : ResponseRol[]=[] // Lista 
  modalRef?: BsModalRef;
  rolSelect :ResponseRol = new ResponseRol() // Mandar para el register 
  titleModal : string = ""
  accionModal : number = 0
  totalItems:number =0
  itemsPerPage:number=1
  request : RequestFilterGeneric = new RequestFilterGeneric()
  myFormFilter:FormGroup

  constructor(
    private _router:Router, 
    private fb:FormBuilder,
    private modalService: BsModalService,
    private _rolService : RolService
  ){
    this.myFormFilter = this.fb.group(
      {
        
        nombreRol: [""],
        descripRol: [""]
      }
    )
  }
  /**
   * FIXME: El lo primero que se ejecuta al cargar la pagina 
   */
  ngOnInit(): void {
    /* let token = sessionStorage.getItem("token")
    const jwtHeaders = new HttpHeaders(
      {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    )
    
    if(!token){
      alert("No as iniciado Sesion")
      this._router.navigate(['auth'])
    } */
    this.filtrar()
  }
  listarRoles()
  {
    this._rolService.getAll().subscribe(
      {
        next:(data:ResponseRol[]) => {
          this.Rol=data;
          
          console.log(data)
        },
        error:(error) => {
          console.log(error)
        },
        complete:() => {}
      }
    )
  }
  crearRol(template: TemplateRef<any>)
  {
    this.titleModal ="Nuevo Rol"
    this.rolSelect = new ResponseRol()
    this.accionModal = AcciontConstants.crear
    this.openModal(template);

  }
  editarRol(template: TemplateRef<any>, rol:ResponseRol)
  {
    this.titleModal ="Editar Rol"
    this.rolSelect = rol
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
      this.filtrar()
    }
  }
  eliminarRol(id:number)
  {
    let result= confirm("Estas seguro de eliminar ")
    if (result)
    {
      this._rolService.delete(id).subscribe(
        {
          next:(data:number)=>{
            alert("Eliminado Existosamente")
          },
          error:(error)=>{},
          complete:()=>{}
        }
      )
    }
  }
  filtrar()
  {
    
    let valuedorm = this.myFormFilter.getRawValue()

    this.request.filtros.push({name:"nombreRol",value: valuedorm.nombreRol} );
    this.request.filtros.push({name:"descripRol",value: valuedorm.descripRol} );
    
    this._rolService.genericFilter(this.request).subscribe
    (
      {
        next:(data:ResponseFilterGeneric<ResponseRol>)=>{
          console.log(data)
          this.Rol  = data.lista;
          this.totalItems = data.totalRegistros
          
        },
        error:(error)=>{
          console.log("ERROR")
        },
        complete:(

        )=>{
          console.log("Compelete")
        }
      }
    )
    
  }
  changePage(event:PageChangedEvent)
  {
    this.request.numeroPagina = event.page
  this.filtrar()
  }
  changeItemsPerPage()
  {
    this.request.cantidad = this.itemsPerPage
    this.filtrar()
  }
}
