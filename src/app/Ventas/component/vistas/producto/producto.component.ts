import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestFilterGeneric } from 'src/app/modules/matenimiento/models/genericFilterRequest.model';
import { ResponseModelo } from 'src/app/modules/matenimiento/models/modelo/modelo-response.model';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import { ModeloService } from 'src/app/modules/matenimiento/service/modelo/modelo.service';
import { ProductoService } from 'src/app/modules/matenimiento/service/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  responseProducto : ResponseProducto []=[]
  responseModelo : ResponseModelo []=[]
  productoEnviar : ResponseProducto = new ResponseProducto ()
  titleModal : string = ""
  accionModal : number = 0
  totalItems:number =0
  itemsPerPage:number=1
  request : RequestFilterGeneric = new RequestFilterGeneric()
  myFormFilter:FormGroup
  constructor (
    private _router: Router,
    private fb:FormBuilder,
    private _productoService : ProductoService,
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
    // this.listarProductos()
  }
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

 
 
  
}
