import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseVWCliente } from '../../../models/cliente/response-VMCliente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestVWCliente } from '../../../models/cliente/request-VWCliente.model';
import { ClienteService } from '../../../service/cliente/cliente.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseVCliente } from '../../../models/cliente/list-cliente-response.model';

@Component({
  selector: 'app-mant-cliente-register',
  templateUrl: './mant-cliente-register.component.html',
  styleUrls: ['./mant-cliente-register.component.css']
})
export class MantClienteRegisterComponent implements OnInit {

  @Input() title :string=""
  @Input() responseVwCliente: ResponseVWCliente = new ResponseVWCliente();
  @Input() responsListCliente:ResponseVCliente = new ResponseVCliente();
  @Input() accion :number=0

  //Output

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  //Declaracion de Variables 

  myForm:FormGroup
  requestCiente:RequestVWCliente = new RequestVWCliente();
  num: string = "";
  doc: string = "";

  constructor(
    private fb : FormBuilder,
    private _clienteService: ClienteService
    
  )
  {
    this.myForm = this.fb.group(
      {
        idCliente: [{ value: 0, disabled: true }, [Validators.required]],
        idPersona: [{ value: 0, disabled: true }, [Validators.required]],
        nombrePersona: [null, [Validators.required]],
        tipoPersona: [null, [Validators.required]],
        tipoDocumento: [null, [Validators.required]],
        numeroDocumento: [null, [Validators.required]],
        telefono: [null, [Validators.required]],
        codigoUbigeo: [null,[Validators.required]],
        direccion: [null,[Validators.required]],
        fechaNacimiento: [null,[Validators.required]],
        estado: [null,[Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    console.log("Titulo =>",this.title);
    console.log("Titulo =>",this.responsListCliente);
    this.myForm.patchValue(this.responsListCliente)
    
    
  }
  /**
   * TODO: CRUD Guardar los datos a la base de datos
   */
  guardar()
  {
    this.requestCiente = this.myForm.getRawValue()
   /*  this.requestCiente.estado = ConvertToBoolean(this.myForm.getRawValue().estado); */
    switch(this.accion)
    {
      case AcciontConstants.crear:
        this.crearCliente()
      break;
      case AcciontConstants.editar:
        this.editarCliente()
      break;
      case AcciontConstants.eliminar:
      break;
    }
  }
  crearCliente()
    {
      this._clienteService.create(this.requestCiente).subscribe(
        {
          next: (data:ResponseVWCliente) => 
          {
            alert("Se a creado el Cliente Correctamente ")
          },
          error: () => {},
          complete: () => 
          {
            this.cerrarModal(true)
          }
        }
        
      )
      console.log(this.myForm.getRawValue())
    }
  editarCliente()
    {
      this._clienteService.update(this.requestCiente).subscribe(
        {
          next: (data:ResponseVWCliente) => 
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
