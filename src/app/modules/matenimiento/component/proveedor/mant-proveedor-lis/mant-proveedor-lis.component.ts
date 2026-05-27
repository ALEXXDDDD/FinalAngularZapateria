import { Component, TemplateRef } from '@angular/core';
import { ResponseProveedor } from '../../../models/proveedor/responseProveedor.model';
import { ResponseVWProveedor } from '../../../models/proveedor/responseVWProveedor.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProveedorService } from '../../../service/proveedor/proveedor.service';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-proveedor-lis',
  templateUrl: './mant-proveedor-lis.component.html',
  styleUrls: ['./mant-proveedor-lis.component.css']
})
export class MantProveedorLisComponent {
  responseProveedor:ResponseProveedor[]=[]
  responseWProveedor:ResponseVWProveedor[]=[]
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
    this._proveedorService.filtroProductoAcabado().subscribe({
      next: (data:ResponseVWProveedor[])=>{
        this.responseWProveedor = data 
        console.log("Proveedors",data)
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
