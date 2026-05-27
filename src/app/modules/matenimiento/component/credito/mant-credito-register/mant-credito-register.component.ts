import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseVCredito } from '../../../models/credito/credito-responseVCredito.model';
import { RequestVCredito } from '../../../models/credito/credito-requestVCredito.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditoService } from '../../../service/credito/credito.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { RequestCredito } from '../../../models/credito/credito-requestCredito.model';
import { ResponseVWCliente } from '../../../models/cliente/response-VMCliente.model';
import { ResponseOrden } from '../../../models/orden/orden-response.model';
import { ClienteService } from '../../../service/cliente/cliente.service';
import { OrdenService } from '../../../service/orden/orden.service';
import { alert_error } from 'src/app/funcionts/general.funcionts';
import { VistCredito } from '../../../models/credito/credito-responseVist.model';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';

@Component({
  selector: 'app-mant-credito-register',
  templateUrl: './mant-credito-register.component.html',
  styleUrls: ['./mant-credito-register.component.css']
})
export class MantCreditoRegisterComponent {
  @Input() title :string=""
  @Input() responseVwCredito: ResponseVCredito = new ResponseVCredito();
  @Input() vistCreditoSelect: VistCredito = new VistCredito();
  @Input() responsListCredito:ResponseVCredito = new ResponseVCredito();
  @Input() accion :number=0

  //Output

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  //Declaracion de Variables 

  myForm:FormGroup
  responseVOrden:ResponseListOrden[]=[]
  requestFiltro: RequestFiltroNombre = new RequestFiltroNombre()
  requestCiente:RequestCredito = new RequestCredito();
  responseVistCredito:VistCredito[]=[]
  responseCliente:ResponseVWCliente[]=[]
  responseOrden:ResponseOrden[]=[]
  num: string = "";
  doc: string = "";

  constructor(
    private fb : FormBuilder,
    private _CreditoService: CreditoService,
    private _clienteService:ClienteService,
    private _ordenService:OrdenService
  )
  {
    this.myForm = this.fb.group(
      {
        idCredito:  [{value:0,disabled:true},[Validators.required]],
        montoTotal: ["null",[Validators.required]] ,
        montoPagado: [null,[Validators.required]] ,
        nombreCliente: [null,[Validators.required]] ,
        montoDeuda: [null,[Validators.required]] ,
        estadoCredito: [null,[Validators.required]] ,
        idCliente: [null,[Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    this.listarCliente()
    this.listarCreditoDisponibles('Activo')
    this.listarOrdenDisponibles("Activo")
    console.log("Titulo =>",this.title);
    console.log("Titulo =>",this.responsListCredito);
    this.myForm.patchValue(this.responsListCredito)
    
    
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
        this.crearCredito()
      break;
      case AcciontConstants.editar:
        this.editarCredito()
      break;
      case AcciontConstants.eliminar:
      break;
    }
  }
  listarCreditoDisponibles(nomre:string)
  {
    this.requestFiltro.nombre = nomre
    this._CreditoService.genericCreditoDisponible(this.requestFiltro).subscribe(
      {
        next:(data:VistCredito[])=>{this.responseVistCredito= data},
        complete:()=>{},
        error:()=>{}
      }
    )
  }
  actualizarDeuda(nombreProd: string | null) {
   

  }

  listarOrdenDisponibles(nomre:string)
  {
    this.requestFiltro.nombre = nomre
    this._ordenService.genericFiltroOrdenActivo(this.requestFiltro).subscribe(
      {
        next:(data:ResponseListOrden[])=>{ this.responseVOrden=data}
      }
    )
  }
  removeZero(field: string): void {
    const control = this.myForm.get(field);
    if (control && control.value === 0) {
      control.setValue('');
    }
  }
  /**
   *TODO: FALTA VALIDAR AL BACK  
    */  
  crearCredito()
    {
      this._CreditoService.create(this.requestCiente).subscribe(
        {
          next: (data:ResponseVCredito) => 
          {
            alert("Se a creado el Credito Correctamente ")
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
  editarCredito()
    {
      this._CreditoService.update(this.requestCiente).subscribe(
        {
          next: (data:ResponseVCredito) => 
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
    listarCliente()
  {
    this._clienteService.getAll().subscribe(
      {
        next:(data:ResponseVWCliente[])=>{console.log(data), this.responseCliente=data},
        error:(error)=>{alert_error("No existe ni un cliente")},
        complete:()=>{}
      }
    )
  }
  listarOrden()
  {
    this._ordenService.getAll().subscribe(
      {
        next:(data:ResponseOrden[])=>{ console.log(data), this.responseOrden=data},
        error:(error)=>{alert_error("No existe ni un cliente")},
        complete:()=>{}
      }
    )
  }
}
