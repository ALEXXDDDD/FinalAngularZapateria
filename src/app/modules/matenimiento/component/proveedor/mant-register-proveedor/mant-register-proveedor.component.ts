import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseVWProveedor } from '../../../models/proveedor/responseVWProveedor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestVWProveedor } from '../../../models/proveedor/requestVWProveedor.model';
import { ProveedorService } from '../../../service/proveedor/proveedor.service';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-register-proveedor',
  templateUrl: './mant-register-proveedor.component.html',
  styleUrls: ['./mant-register-proveedor.component.css']
})
export class MantRegisterProveedorComponent  {
  /**
   * TODO: Declaracion INPUT SALIDAS
   */

  @Input () title : string = ""
  @Input ( ) Proveedor : ResponseVWProveedor = new ResponseVWProveedor()
  @Input () accion : number = 0
  /**
   * TODO: Declaracion OUPUT ENTRADAS 
   */
  @Output () closeModalEmmit  = new EventEmitter<boolean>()
  /**
   * TODO: Declaracion PARA EL FORMULARIO
   */
  myForm : FormGroup

  responseProveedor : ResponseVWProveedor [] =[]
  envioProveedor : RequestVWProveedor = new RequestVWProveedor()

  constructor
  (
    private fb:FormBuilder,
    private _ProveedorService : ProveedorService
  )
  {
    this.myForm = this.fb.group
    (
      {
        idProvedor: [{value:0,disabled:true},[Validators.required]],
        nombrePersona: [null,Validators.required],
        tipoPersona: [null,Validators.required],
        tipoDocumento:  [null,Validators.required],
        numerodocumento:  [null,Validators.required],
        telefono:  [null,Validators.required],
        codigoUbigeo:  [null,Validators.required],
        direccion: [null,Validators.required]
      }
    )
  }
  crearProveedor()
  {
    this._ProveedorService.create(this.envioProveedor).subscribe
    (
      {
        next:() => {
          alert_sucess("Se ha Actualizado correctamente")
        },
        error:() => {},
        complete:() => {}
      }
    )
  }
 
  editarProveedor()
  {
    this._ProveedorService.update(this.envioProveedor).subscribe
    (
      {
        next:() => {
          alert_sucess("Se ha Actualizado correctamente")
        },
        error:() => {
          alert_error("No se pudo guardar el Proveedor")
        },
        complete:() => {}
      }
    )
  }
  guardar()
  {
    this.envioProveedor = this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear :
        this.crearProveedor()
      break;
      case AcciontConstants.editar :
        this.editarProveedor()
      break;
      case AcciontConstants.eliminar :
        
      break;
    }
  }
  
}
