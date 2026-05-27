import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestProducto } from '../../../models/producto/producto-request.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { RequestVProducto } from '../../../models/producto/requestVProducto.model';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { ResponseModelo } from '../../../models/modelo/modelo-response.model';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';

@Component({
  selector: 'app-mant-producto-register',
  templateUrl: './mant-producto-register.component.html',
  styleUrls: ['./mant-producto-register.component.css']
})
export class MantProductoRegisterComponent implements OnInit {
  
  /**
   * TODO: Declaracion INPUT SALIDAS
   */

  @Input () title : string = ""
  @Input ( ) producto : ResponseProducto = new ResponseProducto()
  @Input () accion : number = 0
  /**
   * TODO: Declaracion OUPUT ENTRADAS 
   */
  @Output () closeModalEmmit  = new EventEmitter<boolean>()
  /**
   * TODO: Declaracion PARA EL FORMULARIO
   */
  myForm : FormGroup

  responseProducto : ResponseProducto [] =[]
  responseModelo : ResponseModelo[]=[]
  
  responseUnidad : ResponseUnidad []=[]
  envioProducto : RequestProducto = new RequestProducto()
  envioSelectProducto : RequestProducto = new RequestVProducto()

  constructor
  (
    private fb:FormBuilder,
    private _productoService : ProductoService,
    private _modeloService : ModeloService,
    private _unidadService:UnidadService
  )
  {
    this.myForm = this.fb.group
    (
      {
      idProducto: [{value:0,disabled:true},[Validators.required]],
      idModelo: [{value:0,disabled:true},[Validators.required]],
      nombreProd:[null,Validators.required],
      codigoProd:[null,Validators.required],
      nombreUnidad:[null,Validators.required],
      nombreModelo:[null,Validators.required],
      precioUnitario: [null,[Validators.required]] ,
      stock: [null,[Validators.required]],
      estadoProducto: [null,Validators.required],
      idUnidad: [null,[Validators.required]],
      fotografia:["null",Validators.required],
      color:[null,Validators.required],
      categoria:[null,Validators.required],
      talla: [null,Validators.required],
      descripcion:[null,Validators.required],
      idDetalleProducto: [{value:0,disabled:true},[Validators.required]],
      }
    )
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
  crearProducto()
  {
    this._productoService.create(this.envioProducto).subscribe
    (
      {
        next:() => {
          alert_sucess("Se ha Actualizado correctamente")
        },
        error:() => {},
        complete:() => {}
      }
    )
  }
  editarProducto()
  {
    this._productoService.update(this.envioProducto).subscribe
    (
      {
        next:() => {
          alert_sucess("Se ha Actualizado correctamente")
        },
        error:() => {
          alert_error("No se pudo guardar el producto")
        },
        complete:() => {}
      }
    )
  }
  guardar()
  {
    debugger
    this.envioProducto = this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear :
        this.crearProducto()
      break;
      case AcciontConstants.editar :
        this.editarProducto()
      break;
      case AcciontConstants.eliminar :
        
      break;
    }
  }
  ngOnInit(): void {
    this.myForm.patchValue(this.producto)
    this.listarUnidad()
    this.listarModelos()
  }
  listarUnidad ()
  {
    this._unidadService.getAll().subscribe(
      {
        next:(data:ResponseUnidad[])=>{this.responseUnidad=data}
      }
    )
  }
}
