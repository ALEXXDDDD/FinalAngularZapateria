import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseModelo } from '../../../models/modelo/modelo-response.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { RequestModelo } from '../../../models/modelo/modelo-request.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-modelo-resgister',
  templateUrl: './mant-modelo-resgister.component.html',
  styleUrls: ['./mant-modelo-resgister.component.css']
})
export class MantModeloResgisterComponent implements OnInit {
  @Input() title :string = ""
  @Input() modelo:ResponseModelo = new ResponseModelo()
  @Input() accion:Number = 0

  @Output() closeModalEmmit = new EventEmitter<boolean>()
  myForm:FormGroup
  modeloEnvio:RequestModelo = new RequestModelo()
  constructor (
    private fb:FormBuilder,
    private _modeloService:ModeloService

  )
  {
    this.myForm = this.fb.group
    ({
      idModelo: [null,Validators.required],
      nombreModelo: [null,Validators.required] ,
      codigoModelo: [null,Validators.required] ,
      descripcionModelo: [null,Validators.required] ,
    })
  }
  guardar()
  {
      this.modeloEnvio = this.myForm.getRawValue()
      switch(this.accion)
      {
        case AcciontConstants.crear :
            this.crearModelo()
        break;
        case AcciontConstants.editar :
            this.editarModelo()
        break;
      }
      console.log(this.myForm.getRawValue())
  }
  crearModelo()
  {
    this._modeloService.create(this.modeloEnvio).subscribe
    (
      {
        next :(data:RequestModelo) => {
          alert_sucess("Se ha Creado el Modelo correctamente")
        },
        error :(error) => {
         alert_error("No se creo")
        },
        complete :() => {
          this.cerrarModal(true)
        }
      }
    )
  }
  ngOnInit(): void {
    console.log("Title =>",this.title)
    console.log("CARGO =>",this.modelo)
    this.myForm.patchValue(this.modelo)
  }
  editarModelo()
  {
    this._modeloService.update(this.modeloEnvio).subscribe
    (
      {
        next :(data:ResponseModelo) => {
          
          alert_sucess("Se ha Actualizado correctamente")
        },
        error :(error) => {
          alert("No se pudo Crear EL Modelo")
        },
        complete :() => {
          this.cerrarModal(true)
        }
      }
    )
  }
  cerrarModal(res:boolean)
  {
    this.closeModalEmmit.emit(res)
  }
  
}
