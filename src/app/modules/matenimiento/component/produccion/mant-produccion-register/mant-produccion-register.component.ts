import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestVWProduccion } from '../../../models/Produccion/produccion-requestVW.model';
import { ResponseVWMaterial } from '../../../models/material/material-responseVW.model';
import { ResponseMaterial } from '../../../models/material/material-response.model';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduccionService } from '../../../service/produccion/produccion.service';
import { ResponseVWProduccion } from '../../../models/Produccion/produccion-reponseVW.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { Router } from '@angular/router';
import { RequestVWIngresoProducto } from '../../../models/ingresoProducto/requestVWIngresoProducto.model';
import { ResponseProduccion } from '../../../models/Produccion/produccion-response.model';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { ProductoService } from '../../../service/producto/producto.service';

@Component({
  selector: 'app-mant-produccion-register',
  templateUrl: './mant-produccion-register.component.html',
  styleUrls: ['./mant-produccion-register.component.css']
})
export class MantProduccionRegisterComponent implements OnInit {
  /**
   * TODO inPUT 
   */
  @Input () title :string=""
  @Input () Produccion : ResponseProduccion = new ResponseProduccion()

  @Input () ingresoProducto : RequestVWIngresoProducto = new RequestVWIngresoProducto()
  @Input() accion :number=0

  @Output () closeModalEmmit  = new EventEmitter<boolean>()
 
  myForm : FormGroup
  responseProducto : ResponseProducto []=[]
  ProduccionEnvio : RequestVWProduccion = new RequestVWProduccion ()
  ingresoProductoEnvio : RequestVWIngresoProducto = new RequestVWIngresoProducto()
  responseVWMaterial : ResponseVWMaterial [] = []
  response : ResponseMaterial [] = []
  responseMaterial :ResponseMaterial = new ResponseMaterial()
  responseUnidad : ResponseUnidad[] = []
  materialSelect : ResponseVWMaterial = new ResponseVWMaterial ()
  constructor
  (
    private _ProduccionService : ProduccionService,
    private _router : Router,
     private _fb : FormBuilder,
     private _productoService : ProductoService,
     private _unidadService : UnidadService
  )
  {
    this.myForm = this._fb.group
    (
      {
        idProduccion: [{value:0,disabled:true},[Validators.required]],
        nombreProd: [null,Validators.required] ,
        fechaInicio : [null,Validators.required],
        meta : [null,Validators.required],
        estadoProduccion : [null,Validators.required],
        cantidadFaltante  : [null,Validators.required],
        codigoProduccion : [null,Validators.required] ,
        nombreUnidad: [null,Validators.required] ,
        idUnidad : [{value:0,disabled:true},[Validators.required]],
        fechaFin: [null,Validators.required],
      }
    )
  }
  ngOnInit(): void {
    this.myForm.patchValue(this.responseUnidad)
    this.myForm.patchValue(this.Produccion)
    this.listarProductos()
    this.listarUnidad()
  }
  guardar()
  {
    debugger;
    this.ProduccionEnvio=this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear:
        this.crearProduccion()
      break;
      case AcciontConstants.editar:
        this.editarSailda()
      break;
    }
    console.log(this.myForm.getRawValue())
  }
  crearProduccion()
  {
    debugger;
    this._ProduccionService.create(this.ProduccionEnvio).subscribe(
      {
        next:()=>
          {
            alert_sucess("Se creo La Salida COrrectamente ")
          },
        error:(error)=>
          {
            alert_error("OCURRIO UN ERROR AL CREAR ")
          },
        complete:()=>{
          this.cerrarModal(true)
        }
      }
    )
  }
  editarSailda()
  {
    this._ProduccionService.update(this.ProduccionEnvio).subscribe
    (
      {
        next:(data:ResponseProduccion) => 
          {
            alert_sucess("Se ACTUALIZO LA SALIDA")
          },
        error:(error) => 
          {
            alert_error("Ocurrio un Error")
          },
        complete:() => {}
      }
    )
  }
  
  listarUnidad()
  {
    this._unidadService.getAll().subscribe(
      {
        next :(unidades:ResponseUnidad[])=>{
          this.responseUnidad = unidades
          console.log(unidades);
          
        }
      }
    )
  }
  cerrarModal(res:boolean)
  {
    this.closeModalEmmit.emit(res)
    //true Hubo modificacion en la base de datos
    

    //false => No hubo modificacion de la base de datos
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

}