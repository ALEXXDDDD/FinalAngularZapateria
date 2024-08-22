import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { RequestUnidad } from '../../../models/unidad/p/unidad-request.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-unidad-resgister',
  templateUrl: './mant-unidad-resgister.component.html',
  styleUrls: ['./mant-unidad-resgister.component.css']
})
export class MantUnidadResgisterComponent implements OnInit {
  @Input() title :String=""
  @Input() unidad :ResponseUnidad= new ResponseUnidad() 
  @Input() accion :number= 0 

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  myForm : FormGroup
  
  responseUnidad : ResponseUnidad []=[]

  envioUnidad:RequestUnidad=new RequestUnidad()
  constructor (
    private fb:FormBuilder,
    private _unidadService:UnidadService
  )
  {
    this.myForm = this.fb.group(
      {
        idOrden: [{value:0,disabled:true},[Validators.required]],
        idProducto: [null,Validators.required],
        nombreProd:  [null,Validators.required],
        fechaOrden:  [null,Validators.required],
        fechaRequerido:  [null,Validators.required],
        codigoOrden:  [null,Validators.required],
        estadoOrden: [null,Validators.required],
        idCliente: [null,Validators.required],
        nombreCliente:  [null,Validators.required],
        precioUnitario: [null,Validators.required],
        montoTotal: [null,Validators.required],
        categoria:  [null,Validators.required],
        cantidad: [null,Validators.required],
      }
    )
  }
  ngOnInit(): void {
    console.log(this.title)
    this.myForm.patchValue(this.unidad);
    this.listarUnidad()
  }
  listarUnidad ()
  {
    this._unidadService.getAll().subscribe(
      {
        next:(data:ResponseUnidad[])=>{this.responseUnidad=data}
      }
    )
  }
  guardar()
  {
    this.envioUnidad = this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear: 
        this.crearUnidad()
        break;
      case AcciontConstants.editar: 
        this.editarUnidad()
        break;
      case AcciontConstants.eliminar: 
        break;
      
    }
     console.log(this.myForm.getRawValue())
  }
  crearUnidad()
  {
    this._unidadService.create(this.unidad).subscribe(
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
  editarUnidad()
  {
    this._unidadService.update(this.unidad).subscribe
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