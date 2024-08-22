import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseVWMaterial } from '../../../models/material/material-responseVW.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestVWMaterial } from '../../../models/material/material-requestVW.model';
import { MaterialService } from '../../../service/material/material.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-material-register',
  templateUrl: './mant-material-register.component.html',
  styleUrls: ['./mant-material-register.component.css']
})
export class MantMaterialRegisterComponent implements OnInit {
  @Input() title :String=""
  @Input() material :ResponseVWMaterial= new ResponseVWMaterial() 
  @Input() unidad :ResponseUnidad= new ResponseUnidad() 
  @Input() accion :number= 0 

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  myForm : FormGroup

  responseUnidad : ResponseUnidad[] = []
  envioMaterial : RequestVWMaterial = new RequestVWMaterial ()
  constructor (
    private fb:FormBuilder,
    private _materialService : MaterialService,
    private _unidadService : UnidadService
  )
  {
    this.myForm = this.fb.group(
      {
        idMaterial: [{value:0,disabled:true},[Validators.required]],
        nombreMaterial: [null,Validators.required],
        nombreUnidad: [null,Validators.required],
        stock: [null,Validators.required],
        descripcionMaterial: [null,Validators.required],
        marca: [null,Validators.required],
        estado: [null,Validators.required]
      }
    )
  }
  ngOnInit(): void {
    console.log(this.title)
    this.myForm.patchValue(this.material);
    this.listarUnidad()
  }
  guardar()
  {
    this.envioMaterial = this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear: 
        this.crearMaterial()
        break;
      case AcciontConstants.editar: 
        this.editarMaterial()
        break;
      case AcciontConstants.eliminar: 
        break;
      
    }
     console.log(this.myForm.getRawValue())
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
  crearMaterial()
  {
    this._materialService.create(this.envioMaterial).subscribe(
      {
        next : () => {
          alert_sucess("Se ha Creado el Modelo correctamente")
        },
        error :() => {
          alert_error("No se pudo crear el Modelo ")
        },
        complete :() => {}
      }
    )
  }
  editarMaterial()
  {
    this._materialService.update(this.envioMaterial).subscribe
    (
      {
        next : () => {
          alert_sucess("Se ha Actaulizado el Modelo correctamente")
        },
        error : () => {},
        complete : () => {}
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
