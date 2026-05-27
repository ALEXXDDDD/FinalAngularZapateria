import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SalidaMaterialService } from '../../../service/salidaMaterial/salida-material.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestVWSalidaMaterial } from '../../../models/salidaMaterial/requestVWSalidaMaterial.model';
import { ResponseVWSalidaMaterial } from '../../../models/salidaMaterial/responseVWSalidaMaterial.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { ResponseListSalidaMaterial } from '../../../models/salidaMaterial/responseListVWSalidaMaterial.model';
import { ResponseVWMaterial } from '../../../models/material/material-responseVW.model';
import { ResponseMaterial } from '../../../models/material/material-response.model';
import { MaterialService } from '../../../service/material/material.service';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { ProduccionService } from '../../../service/produccion/produccion.service';
import { ResponseVWProduccion } from '../../../models/Produccion/produccion-reponseVW.model';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';

@Component({
  selector: 'app-mant-salida-material-register',
  templateUrl: './mant-salida-material-register.component.html',
  styleUrls: ['./mant-salida-material-register.component.css']
})
export class MantSalidaMaterialRegisterComponent implements OnInit {
  /**
   * TODO inPUT 
   */
  @Input () title :string = ""
  @Input () salidaMaterial : ResponseListSalidaMaterial = new ResponseListSalidaMaterial()
  @Input() accion :number=0

  @Output () closeModalEmmit  = new EventEmitter<boolean>()
 
  myForm : FormGroup
  SalidaMaterialEnvio : RequestVWSalidaMaterial = new RequestVWSalidaMaterial ()
  responseVWMaterial : ResponseVWMaterial [] = []
  response : ResponseMaterial [] = []
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  responseMaterial :ResponseMaterial = new ResponseMaterial()
  responseUnidad : ResponseUnidad[] = []
  responseProduccion : ResponseVWProduccion []=[]
  materialSelect : ResponseVWMaterial = new ResponseVWMaterial ()
  constructor
  (
    private _salidaMaterialService : SalidaMaterialService,
    private _materialService : MaterialService,
    private _router : Router,
     private _fb : FormBuilder,
     private _produccionService: ProduccionService,
     private _unidadService : UnidadService
  )
  {
    this.myForm = this._fb.group
    (
      {
        nombreMaterial :[null,[Validators.required]],
        idUnidad:[{value:0,disabled:true},[Validators.required]],
        idSalidaMaterial:[null,Validators.required],
        codigoProduccion: [null,Validators.required],
        stock:[{ value: null, disabled: true }, Validators.required],
        cantidad: [null,Validators.required],
        fechaSalida :[null,Validators.required]
      }
    )
  }
  ngOnInit(): void {
    this.myForm.patchValue(this.responseUnidad)
    this.myForm.patchValue(this.salidaMaterial)
    this.filtrarProduccionAcIna('Activo')
    this.listarMateriales()
    this.listarUnidad()
    this.myForm.get('nombreMaterial')?.valueChanges.subscribe(value => {
      this.actualizarStock(value);
    });
  }
  guardar()
  {
    debugger;
    this.SalidaMaterialEnvio=this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear:
        this.crearSalidaMaterial()
      break;
      case AcciontConstants.editar:
        this.editarSailda()
      break;
    }
    console.log(this.myForm.getRawValue())
  }
  crearSalidaMaterial()
  {
    debugger;
    this._salidaMaterialService.create(this.SalidaMaterialEnvio).subscribe(
      {
        next:(data:ResponseVWSalidaMaterial)=>
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
  estCantidad(): boolean {
    
    const cantidadFaltante = this.myForm.get('stock')?.value;
    return cantidadFaltante === 0;
  }
  filtrarProduccionAcIna(nombre:string)
  {



    this.nombreRol.nombre = nombre;

    this._produccionService.genericFiltroProduccionActivo(this.nombreRol).subscribe({
      next: (data: ResponseVWProduccion[]) => {
        this.responseProduccion = data; // Actualiza la lista con la respuesta filtrada
        console.log("Codigo de produccion activas",data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => { }
    });
  }
  editarSailda()
  {
    this._salidaMaterialService.update(this.SalidaMaterialEnvio).subscribe
    (
      {
        next:(data:ResponseVWSalidaMaterial) => 
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
  listarMateriales ()
  {
    this._materialService.getAll().subscribe
    (
      {
        next:(data:ResponseVWMaterial[]) => {
          this.responseVWMaterial = data 
          console.log(data)
        },
        error:() => {},
        complete:() => {}

      }
    )
  }
  actualizarStock(nombreMaterial: string | null) {
    const producto = this.responseVWMaterial.find(p => p.nombreMaterial === nombreMaterial);
    if (producto) {
      this.myForm.get('stock')?.setValue(producto.stock, { emitEvent: false });
    }

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

}