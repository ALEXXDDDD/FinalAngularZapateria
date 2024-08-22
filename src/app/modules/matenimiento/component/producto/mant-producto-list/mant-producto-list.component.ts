import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ProductoService } from '../../../service/producto/producto.service';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { ResponseModelo } from '../../../models/modelo/modelo-response.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { RequestFilterGeneric } from '../../../models/genericFilterRequest.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ResponseFilterGeneric } from '../../../models/genericFilterResponse.models';
import { VistProducAcabadoService } from '../../../service/producto/vist-produc-acabado.service';
import { ResponseProcedureProducto } from '../../../models/producto/producto-responseProcedure.model';


@Component({
  selector: 'app-mant-producto-list',
  templateUrl: './mant-producto-list.component.html',
  styleUrls: ['./mant-producto-list.component.css']
})
export class MantProductoListComponent implements OnInit {
  responseProducto : ResponseProducto []=[]
  responseModelo : ResponseModelo []=[]
  responseStoreProducto : ResponseProcedureProducto[]=[]
  productoEnviar : ResponseProducto = new ResponseProducto ()
  modalRef?: BsModalRef;
  titleModal : string = ""
  accionModal : number = 0
  totalItems:number =0
  itemsPerPage:number=1
  request : RequestFilterGeneric = new RequestFilterGeneric()
  myFormFilter:FormGroup
  constructor (
    private _router: Router,
    private fb:FormBuilder,
    private modalService: BsModalService,
    private _productoService : ProductoService,
    private _storeProducto : VistProducAcabadoService,
    private _modeloService : ModeloService

  )
  {
    this.myFormFilter = this.fb.group(
      {
        
        nombreProd: [""],
        codigoProd: [""]
      }
    )
  }
 
  ngOnInit(): void {
    this.filtrar()
    this.listarProductos()
    this.listarProductosAcabados()
  }
  listarProductosAcabados()
  {
    this._storeProducto.getAll().subscribe(
      {
        next:(data:ResponseProcedureProducto[])=>{
          this.responseStoreProducto=data;
          console.log("Productos Acabados",data)
        },
        error:()=>{},
        complete:()=>{}
      }
    )
  }
  listarProductos()
  {
    this._productoService.getAll().subscribe({
      next: (data:ResponseProducto[])=>{
        this.responseProducto = data 
        console.log("Productos",data)
      },
      error: (error)=>{
        alert("Ocurrio Un error ")
      },      
      complete: ()=>{}
    })
  }
  listarModelo()
  {
    this._modeloService.getAll().subscribe(
      {
        next: (datos:ResponseModelo[])=>{
          this.responseModelo = datos 
        },
        error: (error)=>{
          alert("Ocurrio Un error ")
        },      
        complete: ()=>{}
      }
    )
  }
  crearProducto(template : TemplateRef<any>)
  {
      this.titleModal = "TNuevo Producto"
      this.accionModal = AcciontConstants.crear
      this.productoEnviar = new ResponseProducto()
      this.openModal (template)
  }
  editarProducto(template : TemplateRef<any>, Producto:ResponseProducto)
  {
    this.titleModal = "Editar Producto"
    this.productoEnviar = Producto 
    this.accionModal = AcciontConstants.editar
    this.openModal (template)
  }
  openModal( template : TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template)
  }
  getCloseModalEmit(res : Boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this.listarProductos()
    }
  }
  filtrar()
  {
    
    let valuedorm = this.myFormFilter.getRawValue()

    this.request.filtros.push({name:"nombreProd",value: valuedorm.nombreProd} );
    this.request.filtros.push({name:"codigoProd",value: valuedorm.codigoProd} );
    
    this._productoService.genericFilter(this.request).subscribe
    (
      {
        next:(data:ResponseFilterGeneric<ResponseProducto>)=>{
          console.log(data)
          this.responseProducto  = data.lista;
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
