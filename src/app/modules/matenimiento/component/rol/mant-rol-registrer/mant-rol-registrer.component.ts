import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseRol } from '../../../models/rol/rol-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestRol } from '../../../models/rol/rol-request.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { HttpClient } from '@angular/common/http';
import { RolService } from '../../../service/rol.service';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-rol-registrer',
  templateUrl: './mant-rol-registrer.component.html',
  styleUrls: ['./mant-rol-registrer.component.css']
})
export class MantRolRegistrerComponent implements OnInit {
  
  @Input() title :string=""
  @Input() rol :ResponseRol= new ResponseRol() 
  @Input() accion :number= 0 

  /**
   * Variables de Salida 
   */
  @Output () closeModalEmmit = new EventEmitter<boolean>()
  myForm:FormGroup 
  rolEnvio : RequestRol = new RequestRol()
  constructor (
    private fb:FormBuilder,
    private  _rolService:RolService
  )
  {
    //Enviar el Rol Request 
    this.myForm = this.fb.group(
      {
        irol: [{value:0,disabled:true},[Validators.required]],
        nombreRol: [null,Validators.required],
        descripRol: [null,Validators.required]
      }
    )
  }
  ngOnInit(): void {
      console.log("Title =>",this.title)
      console.log("CARGO =>",this.rol)
      this.myForm.patchValue(this.rol)
  }
  guardar()
  {
    this.rolEnvio = this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear: 
        this.crearRegistro()
        break;
      case AcciontConstants.editar: 
        this.editarRegistro()
        break;
      case AcciontConstants.eliminar: 
        break;
      
    }
     console.log(this.myForm.getRawValue())


  }
  crearRegistro()
  {
    this._rolService.create(this.rolEnvio).subscribe(
      {
        next: (data:ResponseRol)=> {
          alert_sucess("Se ha Creado correctamente El Rol")
        },
        error: ()=> {
          alert_error("Ocurrio un error")
        },
        complete: ()=> {
          this.cerrarModal(true)
        }
      }
    )
  }
  editarRegistro ()
    {
      this._rolService.update(this.rolEnvio).subscribe(
        {
          next: (data:ResponseRol)=> {
            alert_sucess("Se ha Actualizado correctamente")
            
          },
          error: ()=> {
            alert("Ocurrio un error")
          },
          complete: ()=> {
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
