import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseVWProduccion } from '../../../models/Produccion/produccion-reponseVW.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestVWProduccion } from '../../../models/Produccion/produccion-requestVW.model';
import { ProduccionService } from '../../../service/produccion/produccion.service';
import { HttpClient } from '@angular/common/http';
import { convertBolean } from 'src/app/funcionts/general.funcionts';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseProduccion } from '../../../models/Produccion/produccion-response.model';
import { RequestVWIngresoProducto } from '../../../models/ingresoProducto/requestVWIngresoProducto.model';

@Component({
  selector: 'app-mant-detall-produccion-register',
  templateUrl: './mant-detall-produccion-register.component.html',
  styleUrls: ['./mant-detall-produccion-register.component.css']
})
export class MantDetallProduccionRegisterComponent implements OnInit {
  @Input() title :string=""
  @Input () Produccion: ResponseVWProduccion = new ResponseVWProduccion()
  @Input() accion :number=0

  //Output

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  //Declaracion de Variables 

  myForm:FormGroup
  ProduccionEnvio : RequestVWProduccion = new RequestVWProduccion()
  requestProduccion: RequestVWIngresoProducto = new RequestVWIngresoProducto();

  constructor(
    private fb : FormBuilder,
    private _ProduccionService: ProduccionService,
    private http:HttpClient
  )
  {
    this.myForm = this.fb.group(
      {
        idProduccion:[[Validators.required]], 
        nombreProd:[null,[Validators.required]],
        nombreUnidad:[null,[Validators.required]],
        cantidad:[null,[Validators.required]],
        fechaIngreso:[null,[Validators.required]],

      }
    )
    
  }

  ngOnInit(): void {
   
    console.log("Titulo =>",this.title);
    console.log("Titulo =>",this.Produccion);
   
    this.myForm.patchValue(this.Produccion)
    
    
  }
  /**
   * TODO: CRUD Guardar los datos a la base de datos
   */
  guardar()
  {
    
    this.ProduccionEnvio = this.myForm.getRawValue()
    
    
    switch(this.accion)
    {
      case AcciontConstants.crear:
        this.crearProduccion()
      break;
      case AcciontConstants.editar:
        this.editarProduccion()
      break;
      case AcciontConstants.eliminar:
      break;
    }
  }
  crearProduccion()
    {
      this._ProduccionService.create(this.ProduccionEnvio).subscribe(
        {
          next: (data:ResponseProduccion) => 
          {
            alert("Se a creado el Produccion Correctamente ")
          },
          error: () => 
          {
            alert("No se pudo crear el Produccion ")
          },
          complete: () => 
          {
            this.cerrarModal(true)
          }
        }
        
      )
      console.log(this.myForm.getRawValue())
    }
  editarProduccion()
    {
      this._ProduccionService.update(this.ProduccionEnvio).subscribe(
        {
          next: (data:ResponseProduccion) => 
          {
            alert("Se ha actualizado correctamente")
          },
          error: (error) => 
          {
            alert("Ocurrio un error ")
          },
          complete: () => 
          {
            this.cerrarModal(true)
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
