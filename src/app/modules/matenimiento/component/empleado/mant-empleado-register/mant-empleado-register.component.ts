import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseVWEmpleado } from '../../../models/empleado/empleadoVW-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestVWEmpleado } from '../../../models/empleado/empleado-request.model';
import { EmpleadoService } from '../../../service/empleado/empleado.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseEmpleado } from '../../../models/empleado/response-list-empleado.models';
import { convertBolean } from 'src/app/funcionts/general.funcionts';
import { HttpClient } from '@angular/common/http';
import { empleadoApiPeru } from '../../../models/empleado/empleadoApisPero.model';
import { Observable } from 'rxjs';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-mant-empleado-register',
  templateUrl: './mant-empleado-register.component.html',
  styleUrls: ['./mant-empleado-register.component.css']
})
export class MantEmpleadoRegisterComponent implements OnInit{
  @Input() title :string=""
  @Input () empleado: ResponseVWEmpleado = new ResponseVWEmpleado()
  @Input() accion :number=0

  //Output

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  //Declaracion de Variables 

  myForm:FormGroup
  EmpleadoEnvio : RequestVWEmpleado = new RequestVWEmpleado()
  requestEmpleado: RequestVWEmpleado = new RequestVWEmpleado();

  constructor(
    private fb : FormBuilder,
    private _empleadoService: EmpleadoService,
    private http:HttpClient
  )
  {
    this.myForm = this.fb.group(
      {
        idEmpleado: [{value:0,disabled:true},[Validators.required]],
        apellidoEmp:[null,[Validators.required]] ,
        salario:[null,[Validators.required]] ,
        nombrePersona:[null,[Validators.required]] ,

        tipoPersona:[null,[Validators.required]] ,
        usuario1:[null,[Validators.required]] ,
        password:[null,[Validators.required]] ,
        email:[null,[Validators.required]] ,
        estado:[1,[Validators.required]] ,
        tipoDocumento:[null,[Validators.required]] ,
        numeroDocumento:[null,[Validators.required]] ,
        telefono:[null,[Validators.required]] ,
        codigoUbigeo:[null,[Validators.required]] ,
        direccion:[null,[Validators.required]] ,
        imagenEmpleado:["dd",[Validators.required]]
      }
    )
    
  }

  ngOnInit(): void {
   
    console.log("Titulo =>",this.title);
    console.log("Titulo =>",this.empleado);
   
    this.myForm.patchValue(this.empleado)
    
    
  }
  /**
   * TODO: CRUD Guardar los datos a la base de datos
   */
  guardar()
  {
    
    this.EmpleadoEnvio = this.myForm.getRawValue()
    this.EmpleadoEnvio.estado = convertBolean(this.EmpleadoEnvio.estado.toString())
    switch(this.accion)
    {
      case AcciontConstants.crear:
        this.crearEmpleado()
      break;
      case AcciontConstants.editar:
        this.editarEmpleado()
      break;
      case AcciontConstants.eliminar:
      break;
    }
  }
  crearEmpleado()
    {
      this._empleadoService.create(this.EmpleadoEnvio).subscribe(
        {
          next: (data:ResponseEmpleado) => 
          {
            alert("Se a creado el Empleado Correctamente ")
          },
          error: () => 
          {
            alert("No se pudo crear el Empleado ")
          },
          complete: () => 
          {
            this.cerrarModal(true)
          }
        }
        
      )
      console.log(this.myForm.getRawValue())
    }
  editarEmpleado()
    {
      this._empleadoService.update(this.EmpleadoEnvio).subscribe(
        {
          next: (data:ResponseEmpleado) => 
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
    
  buscar()
  {
    debugger;
    this.EmpleadoEnvio = this.myForm.getRawValue()
  
    this._empleadoService.buscarEmpleadoDNI(this.EmpleadoEnvio.numeroDocumento).subscribe(
      {
        next:(data:empleadoApiPeru)=>{
          this.myForm.get("nombrePersona")?.setValue(data.nombres)
          this.myForm.get("apellidoEmp")?.setValue(data.apellidoPaterno  + "  " + data.apellidoMaterno)
          
        },
        error:(error)=>{
            alert("nO ESNTRA AQUI")
        },
        complete:()=>{
          
        }
      }
    )
  }

}
