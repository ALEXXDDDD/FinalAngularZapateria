import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { RequestFilterGeneric } from 'src/app/modules/matenimiento/models/genericFilterRequest.model';
import { ResponseFilterGeneric } from 'src/app/modules/matenimiento/models/genericFilterResponse.models';
import { ResponseModelo } from 'src/app/modules/matenimiento/models/modelo/modelo-response.model';
import { RequestProducto } from 'src/app/modules/matenimiento/models/producto/producto-request.model';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import { ResponseVDetalleProducto } from 'src/app/modules/matenimiento/models/producto/producto-responseVDetalle.model';
import { ModeloService } from 'src/app/modules/matenimiento/service/modelo/modelo.service';
import { ProductoService } from 'src/app/modules/matenimiento/service/producto/producto.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-welcome-body',
  templateUrl: './welcome-body.component.html',
  styleUrls: ['./welcome-body.component.css']
})
export class WelcomeBodyComponent implements OnInit {
  cities: City[] | undefined;
  formGroup: FormGroup | undefined;
  modalRef?: BsModalRef;
  titleModal : string = ""
  accionModal : number = 0
  detalleSelect:ResponseVDetalleProducto = new ResponseVDetalleProducto()
  productoSelect : ResponseProducto = new ResponseProducto()
  responseProducto : ResponseProducto []=[]
  responseModelo : ResponseModelo[]=[]
  requestProducto :RequestProducto= new RequestProducto();
  
  ProductoSelect : RequestProducto = new RequestProducto()
  responseDetalle : ResponseVDetalleProducto[]=[]
  idProduc=this.requestProducto.idProducto
  totalItems:number =0
  itemsPerPage:number=1
  request : RequestFilterGeneric = new RequestFilterGeneric()
  myFormFilter:FormGroup
  constructor (
    private _router:Router, 
    private fb:FormBuilder,
    private _carritoService:CarritoService,
    private modalService: BsModalService,
    private _productoService : ProductoService,
    private _modeloService : ModeloService,

    

  )
  {
    this.myFormFilter = this.fb.group(
      {
        idProducto:[],
        nombreProd: [""],
        codigoProd: [""]
      }
    )
  }
 
  ngOnInit(): void {

    
    //  this.listarProductos()
     this.filtrar()
     this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null)
  });
    // this.listarModelos()
  }
  addProducto(prod:ResponseProducto)
  {
    this._carritoService.addProducto(prod)
  }
  monstrarDetalle(template:TemplateRef<any>,producto:ResponseProducto,id:number)
  {
    this.titleModal ="Detalle"
    this.productoSelect = producto
    this.accionModal = AcciontConstants.detalle
    this.openModal(template);

  }
  // monstrarDetalleProducto(id:number)
  // {
  //   debugger;
  //   this._productoService.getById(id).subscribe(
  //     {
  //       next:(data:ResponseVDetalleProducto[])=>{
  //         this.responseDetalle=data
  //         console.log(data)
  //       }
  //     }
  //   )
  // }
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
 
  filtrar()
  {
    
    let valuedorm = this.myFormFilter.getRawValue()
  
    this.request.filtros.push({name:"nombreProducto",value: valuedorm.nombreProducto} );
    this.request.filtros.push({name:"descripProducto",value: valuedorm.descripProducto} );
    
    this._productoService.genericFilter(this.request).subscribe
    (
      {
        next:(data:ResponseFilterGeneric<ResponseProducto>)=>{
          console.log(data)
          this.responseProducto  = data.lista;
          this.totalItems = data.totalRegistros
          
        },
        error:(error)=>{
          console.log(error)
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
