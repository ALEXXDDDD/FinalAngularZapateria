import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoResponseVDCredito.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResquestVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoRequestVDCredito.model';
import { DetalleCreditoService } from '../../../service/detalleCredito/detalle-credito.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseOrden } from '../../../models/orden/orden-response.model';
import { OrdenService } from '../../../service/orden/orden.service';
import { alert_error } from 'src/app/funcionts/general.funcionts';
import { ResponseVWCliente } from '../../../models/cliente/response-VMCliente.model';
import { ResponseVCredito } from '../../../models/credito/credito-responseVCredito.model';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { VistCredito } from '../../../models/credito/credito-responseVist.model';
import { ClienteService } from '../../../service/cliente/cliente.service';
import { CreditoService } from '../../../service/credito/credito.service';
import { RequestCredito } from '../../../models/credito/credito-requestCredito.model';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';

@Component({
  selector: 'app-mant-detalle-credito-register',
  templateUrl: './mant-detalle-credito-register.component.html',
  styleUrls: ['./mant-detalle-credito-register.component.css']
})
export class  MantDetalleCreditoRegisterComponent implements OnInit {
  
  @Input() title :string=""
  @Input() vistCredito: VistCredito = new VistCredito();
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
  requestDetalleCredito:ResquestVDetalleCredito = new ResquestVDetalleCredito()
  responseVistCredito:VistCredito[]=[]
  responseCliente:ResponseVWCliente[]=[]
  responseOrden:ResponseOrden[]=[]
  num: string = "";
  doc: string = "";

  constructor(
    private fb : FormBuilder,
    private _CreditoService: CreditoService,
    private _detalleCreditoService:DetalleCreditoService,
    private _clienteService:ClienteService,
    private _ordenService:OrdenService
  )
  {
    const idUsuario = parseInt(sessionStorage.getItem('idUsuario') || '0', 10); 
    this.myForm = this.fb.group(
      {
        
        // idCredito:  [{value:0,disabled:true},[Validators.required]],

        // montoPagado: [null,[Validators.required]] ,
        // montoDeuda: [null,[Validators.required]] ,
        // estadoCredito: [null,[Validators.required]] ,
        // idCliente: [null,[Validators.required]],
        idUsuario: [{idUsuario},[Validators.required]],
        montoAmortizacion: [null,[Validators.required]],
        fechaAmortizacion: [null,[Validators.required]],
        idOrden: [{value:0,disabled:true},[Validators.required]],
        nombreCliente: [null,[Validators.required]],
        relacionCliente: [null,[Validators.required]],
        idCredito: [{value:0,disabled:true},[Validators.required]],
        idDetalleCredito: [{value:0,disabled:true},[Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    debugger
    this.listarCreditoDisponibles('Activo')
    console.log("Titulo =>",this.title);
    console.log("Titulo =>",this.responsListCredito);
    this.myForm.patchValue(this.responsListCredito)
    this.listarDetalleCredito(this.vistCredito.idCliente)
    
    
  }
 
  /**
   * TODO: CRUD Guardar los datos a la base de datos
   */
  guardar()
  {
    // this.requestCiente = this.myForm.getRawValue()
    this.requestDetalleCredito = this.myForm.getRawValue();
   /*  this.requestCiente.estado = ConvertToBoolean(this.myForm.getRawValue().estado); */
    switch(this.accion)
    {
      case AcciontConstants.crear:
        // this.crearCredito()
        this.crearDetalleCredito()
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
        next:(data:VistCredito[])=>{this.responseVistCredito= data; console.log("Credito Activos",data)},
        complete:()=>{},
        error:()=>{}
      }
    )
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
  listarDetalleCredito(id:number)
  {
    debugger
    const body = JSON.stringify(id); //
    this._CreditoService.getDetalleCredito(id).subscribe(
      {
        next:(data:VistCredito[])=>{this.responseVistCredito=data; console.log("Detalle Del credito",data) }
      }
    )
  }
  /**
   *TODO: FALTA VALIDAR AL BACK  
    */  


   crearDetalleCredito()
   {
    this._detalleCreditoService.create(this.requestDetalleCredito).subscribe(
      {
        next:()=>{},
        error:()=>{},
        complete:()=>{}
      }
    )
   }
  // crearCredito()
  //   {
  //     this._CreditoService.create(this.requestCiente).subscribe(
  //       {
  //         next: (data:ResponseVCredito) => 
  //         {
  //           alert("Se a creado el Credito Correctamente ")
  //         },
  //         error: () => {},
  //         complete: () => 
  //         {
  //           this.cerrarModal(true)
  //         }
  //       }
        
  //     )
  //     console.log(this.myForm.getRawValue())
  //   }
  editarCredito()
    {
      this._CreditoService.update(this.requestCiente).subscribe(
        {
          next: (data:ResponseVCredito) => 
          {
            alert("Se ha actualizado correctamente")
          },
          error: () => 
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
        error:()=>{alert_error("No existe ni un cliente")},
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
