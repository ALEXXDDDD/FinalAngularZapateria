import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VistCredito } from '../../../models/credito/credito-responseVist.model';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditoService } from '../../../service/credito/credito.service';
import { DetalleCreditoService } from '../../../service/detalleCredito/detalle-credito.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { OrdenService } from '../../../service/orden/orden.service';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { ResquestVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoRequestVDCredito.model';
import { alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-pago-credito-resgister',
  templateUrl: './mant-pago-credito-resgister.component.html',
  styleUrls: ['./mant-pago-credito-resgister.component.css']
})
export class MantPagoCreditoResgisterComponent implements OnInit {
  
  @Input() title :string=""
  @Input() vistCredito: VistCredito = new VistCredito();
  @Input() accion :number=0

  //Output

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  //Declaracion de Variables 

  myForm:FormGroup
  orden: ResponseListOrden[] = [];
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  requestFiltro: RequestFiltroNombre = new RequestFiltroNombre()
  responseVistCredito:VistCredito[]=[]
  resquestVDetalleCredito : ResquestVDetalleCredito = new ResquestVDetalleCredito()
  num: string = "";
  doc: string = "";

  constructor(
    private fb : FormBuilder,
    private _CreditoService: CreditoService,
    private _OrdenService: OrdenService,
    private _detalleCreditoService:DetalleCreditoService,

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
        montoAmortizacion:[null,[Validators.required]],
        montoDeuda:[{ value: null, disabled: true }, Validators.required],
        fechaAmortizacion: [null,[Validators.required]],
        idOrden:  [{value:0,disabled:true},[Validators.required]],
        codigoOrden: [{ value: null, disabled: true }, Validators.required],
        nombreCliente:[null, Validators.required],
        relacionCliente: [null,[Validators.required]] ,
        idCredito: [{value:0,disabled:true},[Validators.required]],
        idDetalleCredito: [{value:0,disabled:true},[Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    this.listarCreditoDisponibles('Activo')
    console.log("Titulo =>",this.title);
    this.listarCreditoDisponibles("ACTIVO")
  this.filtrarOrdenAcIna("ACTIVO")
    this.myForm.patchValue(this.resquestVDetalleCredito)
    this.listarDetalleCredito(this.vistCredito.idCliente)
    debugger
    this.myForm.get('nombreCliente')?.valueChanges.subscribe(value => {
      this.actualizarCredito(value);
      this.actualizarOrden(value);
      
      
    });

    this.myForm.get('nombreCliente')?.valueChanges.subscribe(value => {
      this.actualizarCredito(value);
    
    });
    this.myForm.get('nombreCliente')?.valueChanges.subscribe(value => {
      this.actualizarCredito(value);
    
    });
  }
  filtrarOrdenAcIna(nombre:string)
  {



    this.nombreRol.nombre = nombre;

    this._OrdenService.genericFiltroOrdenActivo(this.nombreRol).subscribe({
      next: (data: ResponseListOrden[]) => {
        this.orden = data; // Actualiza la lista con la respuesta filtrada
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => { }
    });
  }
  actualizarOrden(nombreCliente: string | null) {
    
    const producto = this.orden.find(p => p.nombreCliente === nombreCliente);
    if (producto) {
      this.myForm.get('codigoOrden')?.setValue(producto.codigoOrden, { emitEvent: false });
    }

  }
  /**
   * TODO: CRUD Guardar los datos a la base de datos
   */
  guardar()
  {
    debugger
    // this.requestCiente = this.myForm.getRawValue()
    this.resquestVDetalleCredito = this.myForm.getRawValue();
   /*  this.requestCiente.estado = ConvertToBoolean(this.myForm.getRawValue().estado); */
    switch(this.accion)
    {
      case AcciontConstants.crear:
        // this.crearCredito()
        this.crearPagoCredito()
      break;
      case AcciontConstants.editar:
      
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
  actualizarCredito(nombreCliente: string | null) {
    debugger
    const producto = this.responseVistCredito.find(p => p.nombreCliente === nombreCliente);
    if (producto) {
      this.myForm.get('montoDeuda')?.setValue(producto.montoDeuda, { emitEvent: false });
      this.myForm.get('montoPagado')?.setValue(producto.montoPagado, { emitEvent: false });
    }

  }
 crearPagoCredito()
 {
  this._detalleCreditoService.create(this.resquestVDetalleCredito).subscribe(
    {
      next:()=>{alert_sucess("Se creo el pago")}
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

    cerrarModal(res:boolean)
    {
      this.closeModalEmmit.emit(res)
      //true Hubo modificacion en la base de datos
      

      //false => No hubo modificacion de la base de datos
    }

  
}
