import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseVWProveedor } from '../../../models/proveedor/responseVWProveedor.model';
import { ResponseProveedor } from '../../../models/proveedor/responseProveedor.model';
import { ProveedorService } from '../../../service/proveedor/proveedor.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-list-proveedor',
  templateUrl: './mant-list-proveedor.component.html',
  styleUrls: ['./mant-list-proveedor.component.css']
})
export class MantListProveedorComponent implements OnInit {
  responseProveedor:ResponseProveedor[]=[]
  proveedorEnviar : ResponseVWProveedor = new ResponseVWProveedor ()
  modalRef?: BsModalRef;
  titleModal : string = ""
  accionModal : number = 0
  constructor (
    private _proveedorService : ProveedorService,
    private modalService: BsModalService,
  )
  {

  }
  
  ngOnInit(): void {
    this.listarProveedores()
  }
  listarProveedores()
  {
    this._proveedorService.getAll().subscribe({
      next: (data:ResponseProveedor[])=>{
        this.responseProveedor = data 
        console.log(data)
      },
      error: (error)=>{
        alert("Ocurrio Un error ")
      },      
      complete: ()=>{}
    })
  }
  crearProveedor(template : TemplateRef<any>)
  {
      this.titleModal = "Nuevo Proveedor"
      this.accionModal = AcciontConstants.crear
      this.proveedorEnviar = new ResponseVWProveedor()
      this.openModal (template)
  }
  editarProveedor(template : TemplateRef<any>, Proveedor:ResponseVWProveedor)
  {
    this.titleModal = "Editar Proveedor"
    this.proveedorEnviar = Proveedor 
    this.accionModal = AcciontConstants.editar
    this.openModal (template)
  }
  config = 
  {
    backdrop : true,
    ignoreBackdropClick : false,
  };
  openModal( template : TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template,Object.assign({},{class:"gray modal-lg"}, this.config))
  }
  getCloseModal(res : Boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this.listarProveedores()
    }
  }

}
