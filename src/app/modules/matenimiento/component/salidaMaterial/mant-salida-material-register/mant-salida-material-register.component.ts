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
  responseMaterial :ResponseMaterial = new ResponseMaterial()
  responseUnidad : ResponseUnidad[] = []
  materialSelect : ResponseVWMaterial = new ResponseVWMaterial ()
  constructor
  (
    private _salidaMaterialService : SalidaMaterialService,
    private _materialService : MaterialService,
    private _router : Router,
     private _fb : FormBuilder,
     private _unidadService : UnidadService
  )
  {
    this.myForm = this._fb.group
    (
      {
        idProduccion :[null,Validators.required],
        nombreMaterial :[null,Validators.required],
        nombreUnidad :[null,Validators.required],
        cantidad: [null,Validators.required],
        fechaSalida :[null,Validators.required]
      }
    )
  }
  ngOnInit(): void {
    this.myForm.patchValue(this.responseUnidad)
    this.myForm.patchValue(this.salidaMaterial)
    this.listarMateriales()
    this.listarUnidad()
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
