import { Component, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { RequestVWUsuario } from 'src/app/models/request-vwUsuario-model';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { ResponseUsuario } from 'src/app/modules/matenimiento/models/usuario/responseUsuario.models';
import { CorreoVerifApi } from 'src/app/modules/matenimiento/models/usuario/usuarioApiCorreo.model';
import { UsuarioService } from 'src/app/modules/matenimiento/service/usuario/usuario.service';

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
  constructor(
    private fb:FormBuilder,
    private _usuarioService : UsuarioService,
    private _router : Router
    )
  {
    
    this.myForm = this.fb.group(
      {
        idUsuario: [{value:0 , disabled:true},[Validators.required]],
        // lugarRegistro: [{value:1 , disabled:true},[Validators.required]],
        idPersona: [{value:0 , disabled:true},[Validators.required]],
        irol: [{value:0 , disabled:true},[Validators.required]],
        nombrePersona: [null,Validators.required],
        tipoPersona: [null,Validators.required],
        tipoDocumento: [null,Validators.required],
        numeroDocumento: [null,Validators.required],
        telefono: [null,Validators.required],
        codigoUbigeo: [null,Validators.required], 
        direccion: [null,Validators.required], 
        usuario1: [null,Validators.required],
        password: [null,Validators.required],
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
  
  guardar()
  {
    
    debugger
    
    this.usuarioEnvio = this.myForm.getRawValue()

    this.crearUsuario()
  }
  crearUsuario()
  {    
    this._usuarioService.create(this.usuarioEnvio).subscribe(
              {
              next : (data:ResponseUsuario) => {
                alert("Se creo el Usuario exitosamente ")
              },  
              complete : () => {
                alert("Ocurrio un error")
                this._router.navigate(['dasboard'])
              },
              error : () => {
                alert("Ocurrio un error")
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
