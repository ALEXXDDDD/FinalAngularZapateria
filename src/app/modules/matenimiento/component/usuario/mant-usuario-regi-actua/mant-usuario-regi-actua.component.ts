import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { convertBolean } from 'src/app/funcionts/general.funcionts';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { UsuarioService } from '../../../service/usuario/usuario.service';
import { RequestUsuario, RequestVWUsuario } from 'src/app/models/request-vwUsuario-model';
import { ResponseUsuario } from '../../../models/usuario/responseUsuario.models';
import { ResponseRol } from '../../../models/rol/rol-response.model';
import { RolService } from '../../../service/rol.service';

@Component({
  selector: 'app-mant-usuario-regi-actua',
  templateUrl: './mant-usuario-regi-actua.component.html',
  styleUrls: ['./mant-usuario-regi-actua.component.css']
})
export class MantUsuarioRegiActuaComponent {
  @Input() title :string=""
  @Input() usuario:ResponseVUsuario = new ResponseVUsuario()
  @Input() accion :number=0

  //Output

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  //Declaracion de Variables 

  myForm:FormGroup
  usuarioSelet:RequestVWUsuario=new RequestVWUsuario()
  mostrarListaCompleta: boolean = true;
  Rol: ResponseRol[] = [];
  constructor(
    private fb : FormBuilder,
    private _usuarioService:UsuarioService,
    private _rolService: RolService,
    private http:HttpClient
  )
  {
    const idUsuario = sessionStorage.getItem('idUsuario');
    this.myForm = this.fb.group(
      {
        idEmpleado: [{value:0,disabled:true},[Validators.required]],
        usuario:[null,[Validators.required]] ,
        idUsuario: [idUsuario,[Validators.required]],
        numeroDocumento: [null,[Validators.required]],
        email: [{value:idUsuario},[Validators.required]],
        nombrePersona:[null,[Validators.required]] ,
        nombreRol:[null,[Validators.required]] ,
        telefono:[null,[Validators.required]] ,
        direccion:[null,[Validators.required]] ,
        
      }
    )
    console.log(this.myForm.getRawValue)
  }

  ngOnInit(): void {

    console.log("Titulo =>",this.title);
   this.listarRoles()
   
    this.myForm.patchValue(this.usuario)
    if(this.accion== AcciontConstants.editar)
    {
      this.myForm.get('nombrePersona')?.disable()
      this.myForm.get('email')?.disable()
      this.myForm.get('numeroDocumento')?.disable()
      
    }
  }
  listarRoles() {
    this._rolService.getAll().subscribe({
      next: (data: ResponseRol[]) => {
        this.Rol = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {}
    });
  }
  /**
   * TODO: CRUD Guardar los datos a la base de datos
   */
  guardar() {

    this.usuarioSelet = this.myForm.getRawValue();
    
    switch(this.accion) {
      case AcciontConstants.crear:
        this.crearUsuario();
        break;
      case AcciontConstants.editar:
        this.editarUsuario();
        break;
      case AcciontConstants.eliminar:
        // Implementar la eliminación si es necesario.
        break;
    }
  }
  crearUsuario()
    {
      this._usuarioService.create(this.usuarioSelet).subscribe(
        {
          next: (data:ResponseUsuario) => 
          {
            alert("Se a creado el Usuario Correctamente ")
          },
          error: () => 
          {
            alert("No se pudo crear el Usuario ")
          },
          complete: () => 
          {
            this.cerrarModal(true)
          }
        }
        
      )
      console.log(this.myForm.getRawValue())
    }
  editarUsuario()
    {
 
      this._usuarioService.update(this.usuarioSelet).subscribe(
        {
          next: (data:ResponseUsuario) => 
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
