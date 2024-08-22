import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_sucess } from 'src/app/funcionts/general.funcionts';
import { RequestVWUsuario } from 'src/app/models/request-vwUsuario-model';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { CarritoItem } from 'src/app/modules/matenimiento/models/carritoItem/carritoItem.model';
import { RequestActualizacionDireccion } from 'src/app/modules/matenimiento/models/cliente/request-actualizacionUsuario.model';
import { ResponsePerfil } from 'src/app/modules/matenimiento/models/perfil/perfil-response.model';
import { ResponsePersona } from 'src/app/modules/matenimiento/models/persona/response-persona.model';
import { UsuarioSesionStore } from 'src/app/modules/matenimiento/models/usuario/responseSesionStore.model';
import { ResponseUsuario } from 'src/app/modules/matenimiento/models/usuario/responseUsuario.models';
import { ActuDirecService } from 'src/app/modules/matenimiento/service/actuDirec/actu-direc.service';
import { UsuarioService } from 'src/app/modules/matenimiento/service/usuario/usuario.service';
import { PerfilListComponent } from 'src/app/pages/perfil/perfil-list/perfil-list.component';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';

@Component({
  selector: 'app-envio-domicilio',
  templateUrl: './envio-domicilio.component.html',
  styleUrls: ['./envio-domicilio.component.css']
})
export class EnvioDomicilioComponent implements OnInit {
  @Input() accion :number=0
  @Input() usuario :ResponseUsuario= new ResponseUsuario() 
  @Input() dreccion :RequestActualizacionDireccion= new RequestActualizacionDireccion() 
  @Output () closeModalEmmit = new EventEmitter<boolean>()
  responsePerfil : ResponsePerfil[]=[]
  myForm:FormGroup 
  isEditable: boolean = false;  // Estado inicial del input
  inputValue: string = 'Texto inicial';  // Valor inicial del input
  direccionEnvio : RequestVWUsuario = new RequestVWUsuario()
  carrito:CarritoItem[]=[]
  requestDireccion : RequestActualizacionDireccion = new RequestActualizacionDireccion()
  constructor(
    private fb:FormBuilder,
    private _perfilService:PerfilService,
    private _actuaDireccion : ActuDirecService,
    private _carritoService:CarritoService,
    private _usuarioService : UsuarioService
  ) { 
    
  {
    let idUsu = sessionStorage.getItem('idUsuario')
    //Enviar el Producto Request 
    this.myForm = this.fb.group(
      {
        
        idUsuario: [{value:idUsu,disabled:true},[Validators.required]],
        direccion : [null,Validators.required],
        nombrePersona:["",Validators.required] ,
        iRol:["",Validators.required] ,
        nombreRol:["",Validators.required] ,
        tipoPersona:["",Validators.required] ,
        tipoDocumento:["",Validators.required] ,
        numeroDocumento:["",Validators.required] ,
        telefono:["",Validators.required] ,
        codigoUbigeo:["",Validators.required],  
        usuarioV:["",Validators.required] ,
        password:["",Validators.required] ,
        email:["",Validators.required] ,
        estado: ["",Validators.required] ,

      }
    )
  }
  }
  eliminarProducto(item:CarritoItem):void
  {
    this._carritoService.removeProducto(item.producto.idProducto)
  }
  listarCarrito()
  {
    this._carritoService.listarCarrito().subscribe(
      {
        next:(data)=>{ this.carrito=data}
      }
    )
  }
  enableEditing() {
 
    this.isEditable = true;
    
  }

  saveChanges() {
    this.isEditable = false;
    // Aquí puedes agregar lógica para guardar los cambios, por ejemplo, enviar el valor a un servidor
  }
  perfil()
  {
    let idUsu = sessionStorage.getItem('idUsuario')
    if(idUsu!=null)
    {
      this._perfilService.getDetalle(idUsu).subscribe(
        {
          next:(data:ResponsePerfil[])=>{this.responsePerfil=data }
        }
      )
    }
   
  }
  guardar()
  {

    this.requestDireccion = this.myForm.getRawValue()
    switch(this.accion)
    { 
      case AcciontConstants.crear: 
        this.actualizarDireccion()
        break;
    }
     console.log(this.myForm.getRawValue())


  }
  editarRegistro() {
    throw new Error('Method not implemented.');
  }
  actualizarDireccion()
  {

    this._actuaDireccion.update(this.requestDireccion).subscribe(
      {
        next:(data:RequestActualizacionDireccion)=>{
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
  cerrarModal(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.listarCarrito()
    this.perfil()
  }
  
 
 

}
