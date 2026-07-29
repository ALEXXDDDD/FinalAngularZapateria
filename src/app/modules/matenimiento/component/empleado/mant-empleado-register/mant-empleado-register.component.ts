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
import { RequestFiltroSueldo } from '../../../models/empleado/request-flitroSueldo.model';
import { RolService } from '../../../service/rol.service';
import { ResponseRol } from '../../../models/rol/rol-response.model';

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
  requestSalario : RequestFiltroSueldo = new RequestFiltroSueldo();
  requestEmpleado: RequestVWEmpleado = new RequestVWEmpleado();
  responseEmpleado : ResponseVWEmpleado = new ResponseVWEmpleado();
  roles: ResponseRol[] = [];
  mostrarListaCompleta: boolean = true;
  constructor(
    private fb : FormBuilder,
    private _empleadoService: EmpleadoService,
    private _rolservice : RolService,
    private http:HttpClient
  )
  {
    const idUsuario = sessionStorage.getItem('idUsuario');
    this.myForm = this.fb.group(
      {
        idEmpleado: [{value:0,disabled:true},[Validators.required]],
        apellidoEmp:[null,[Validators.required]] ,
        salario:[null,[Validators.required]] ,
        nombrePersona:[null,[Validators.required]] ,
        idUsuario: [{value:idUsuario},[Validators.required]],
        usuario1:[null,[Validators.required]] ,
        password:[null,[Validators.required, Validators.minLength(9)]] ,
        email:[null,[Validators.required]] ,
        tipoDocumento:[null,[Validators.required]] ,
        numeroDocumento:[null,[Validators.required]] ,
        telefono:[null,[Validators.required]] ,
        nombreRol:[null,[Validators.required]] ,
      }
    )
    console.log(this.myForm.getRawValue)
  }

  ngOnInit(): void {
   
    console.log("Titulo =>",this.title);
    console.log("Titulo =>",this.empleado);
    console.log("Titulo =>",this.title);
    this.listarRoles();
    
    this.myForm.patchValue(this.empleado)
     if(this.accion== AcciontConstants.editar)
     {
       this.myForm.get('usuario1')?.disable()
       this.myForm.get('email')?.disable()
       this.myForm.get('password')?.disable()
       
     }
    else {
    // Si es creación, escuchamos los cambios del documento para clonarlo en usuario1
      this.escucharCambiosDocumento();
       this.myForm.get('usuario1')?.disable()
    }
     
  }
  listarRoles(): void {
    this._rolservice.getAll().subscribe({
      next: (data: ResponseRol[]) => {
        console.log('Roles obtenidos:', data);
        this.roles = data;
      },
      error: (error: any) => {
        console.error('Error al listar roles', error);
      }
    });
  }
 escucharCambiosDocumento(): void {
  this.myForm.get('numeroDocumento')?.valueChanges.subscribe(valor => {
    // Usamos emitEvent: false para evitar bucles o disparos innecesarios de validaciones
    this.myForm.get('usuario1')?.setValue(valor, { emitEvent: false });
  });
}
  /**
   * TODO: CRUD Guardar los datos a la base de datos
   */
  guardar()
  {
    debugger
    console.log("=== GUARDAR INICIADO ===");
    console.log("Acción recibida:", this.accion);
    console.log("AcciontConstants.crear:", AcciontConstants.crear);
    console.log("Formulario válido:", this.myForm.valid);
    console.log("Errores del formulario:", this.myForm.errors);
    
    // Mostrar errores de cada campo
    Object.keys(this.myForm.controls).forEach(key => {
      const control = this.myForm.get(key);
      if (control?.invalid) {
        console.log(`Campo ${key} inválido:`, control.errors);
      }
    });

    this.EmpleadoEnvio = this.myForm.getRawValue()
    console.log("Datos enviados:", this.EmpleadoEnvio);
  
    // Validar que estado exista antes de convertir
    this.EmpleadoEnvio.estado = convertBolean(
      this.EmpleadoEnvio.estado != null ? this.EmpleadoEnvio.estado.toString() : 'true'
    )
    
    console.log("Acción:", this.accion, "| Crear:", AcciontConstants.crear, "| Editar:", AcciontConstants.editar);
    
    switch(this.accion)
    {
      case AcciontConstants.crear:
        console.log("✓ Entrando a CREAR");
        this.crearEmpleado()
      break;
      case AcciontConstants.editar:
        console.log("✓ Entrando a EDITAR");
        this.editarEmpleado()
      break;
      case AcciontConstants.eliminar:
        console.log("✓ Entrando a ELIMINAR");
      break;
      default:
        console.log("✗ NO ENTRÓ EN NINGÚN CASE");
    }
  }
  crearEmpleado()
    {
      console.log("🔄 crearEmpleado() ejecutándose");
      console.log("Datos a enviar:", this.EmpleadoEnvio);
      
      this._empleadoService.create(this.EmpleadoEnvio).subscribe(
        {
          next: (data:ResponseEmpleado) => 
          {
            console.log("✅ Respuesta del servidor:", data);
            alert("Se a creado el Empleado Correctamente ")
          },
          error: (error) => 
          {
            console.error("❌ Error en la petición:", error);
            alert("No se pudo crear el Empleado. Error: " + (error?.message || error))
          },
          complete: () => 
          {
            console.log("✓ Petición completada");
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
