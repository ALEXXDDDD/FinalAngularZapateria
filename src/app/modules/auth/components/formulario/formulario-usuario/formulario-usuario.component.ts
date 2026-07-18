import { Component, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { ResponseLogin } from 'src/app/models/login-response.models';
import { RequestVWUsuario } from 'src/app/models/request-vwUsuario-model';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { ResponseUsuario } from 'src/app/modules/matenimiento/models/usuario/responseUsuario.models';
import { CorreoVerifApi } from 'src/app/modules/matenimiento/models/usuario/usuarioApiCorreo.model';
import { UsuarioService } from 'src/app/modules/matenimiento/service/usuario/usuario.service';
import { EmpleadoService } from 'src/app/modules/matenimiento/service/empleado/empleado.service';
import { empleadoApiPeru } from 'src/app/modules/matenimiento/models/empleado/empleadoApisPero.model';
import { LoadStateEnum } from 'src/app/modules/matenimiento/models/core/utils/load-enum';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {
  @Input() title :string=""
  @Input() usuario :ResponseVUsuario= new ResponseVUsuario() 
  @Input() accion :number= 0 
  myForm:FormGroup
  usuarioEnvio : RequestVWUsuario = new RequestVWUsuario()
  isLoginView = true
  dniBuscado = false
  frmLoadSt = LoadStateEnum.None;
  loadStateEnum = LoadStateEnum;
  welcomeMessage = '';
  constructor(
    private fb:FormBuilder,
    private _usuarioService : UsuarioService,
    private _empleadoService: EmpleadoService,
    private _router : Router,
    private messageService: MessageService
    )
  {
    
    this.myForm = this.fb.group(
      {
        idUsuario: [{value:0 , disabled:true},[Validators.required]],
        // lugarRegistro: [{value:1 , disabled:true},[Validators.required]],
        idPersona: [{value:0 , disabled:true},[Validators.required]],
        irol: [{value:0 , disabled:true},[Validators.required]],
        nombrePersona: [null,Validators.required],
        tipoPersona: ['Natural',Validators.required],
        tipoDocumento: ['DNI',Validators.required],
        numeroDocumento: [null,Validators.required,Validators.minLength(8)],
        telefono: [null,Validators.required],
        codigoUbigeo: [null,Validators.required], 
        direccion: [null,Validators.required], 
        usuario1: [null,Validators.required],
        password: [null,[Validators.required, Validators.minLength(8)]],
        email: [null,Validators.required,Validators.email],
        estado: [true,Validators.required],
      }
    )
  }

  ngOnInit(): void {
  
    console.log("Title",this.title)
    console.log("Usuario",this.usuario)
    this.myForm.patchValue(this.usuario)
  }

  mostrarLogin(): void {
    this.isLoginView = true;
  }

  mostrarRegistro(): void {
    this.isLoginView = false;
  }

  volverInicio(): void {
    this._router.navigate(['']);
  }

  buscarPorDni(): void {
    const dni = this.myForm.get('numeroDocumento')?.value;
    if (!dni) {
      alert('Ingrese un número de documento para buscar');
      return;
    }

    this._empleadoService.buscarEmpleadoDNI(dni).subscribe({
      next: (data: empleadoApiPeru) => {
        if (data?.nombres) {
          this.myForm.get('nombrePersona')?.setValue(data.nombres);
          this.myForm.get('nombrePersona')?.disable();
          this.myForm.get('numeroDocumento')?.disable();
          this.myForm.get('tipoPersona')?.setValue('Natural');
          this.myForm.get('tipoPersona')?.disable();
          this.myForm.get('usuario1')?.setValue(dni);
          this.dniBuscado = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Datos Encontrados',
            detail: 'Los datos del DNI se cargaron correctamente.'
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Sin resultados',
            detail: 'No se encontraron datos para este DNI.'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo consultar el DNI.'
        });
      }
    });
  }
  
  guardar()
  {
    this.frmLoadSt = LoadStateEnum.Loading;
    this.usuarioEnvio = this.myForm.getRawValue()

    this.crearUsuario()
  }
  crearUsuario()
  {    
    this._usuarioService.loginRegister(this.usuarioEnvio).subscribe(
              {
              next : (data:ResponseLogin) => {
                if(data.success && data.nameRol=="Cliente")
                  {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("nombrePersona",data.persona.nombrePersona);
                    sessionStorage.setItem("idUsuario",data.vwUsuario.idUsuario.toString());
                    sessionStorage.setItem("usuario",data.vwUsuario.usuario);
                    sessionStorage.setItem("nombreRol",data.nameRol);
                    this.welcomeMessage = `Bienvenido ${data.persona.nombrePersona}`;
                    this.frmLoadSt = LoadStateEnum.Success;
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Usuario Registrado',
                      detail: 'Se creó el usuario correctamente.'
                    });
                    setTimeout(() => {
                      this._router.navigate(['']);
                    }, 1200);
                  }
                else {
                  this.frmLoadSt = LoadStateEnum.Error;
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo completar el registro.'
                  });
                }
              },  
              complete : () => {
              },
              error : () => {
                this.frmLoadSt = LoadStateEnum.Error;
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Ocurrió un error.'
                });
              }
            })
  }
  validarCorreo()
  {
    debugger;
    this.usuarioEnvio = this.myForm.getRawValue()
    this._usuarioService.validacionCorreoUsuario(this.usuarioEnvio.email)
    .subscribe(
      {
        
        next:(data:any)=>{
          console.log(data)
          debugger;
          if (data.data.status == 'valid')
          {
            console.log(data)
            alert_sucess("Correo Correcto")
          }
          else if (data.status == 'invalid'){
            console.log(data)
            alert_sucess("Correo INCorrecto")
            
          }
       
        },
        error:()=>{
          alert_error(" No se pudo Verficar el Correo")
        },
        complete:()=>{}
      }
    )
  }

}
