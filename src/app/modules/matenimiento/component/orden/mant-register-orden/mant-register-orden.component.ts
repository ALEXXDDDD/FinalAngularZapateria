import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseOrden } from '../../../models/orden/orden-response.model';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestVWOrden } from '../../../models/orden/orden-responseVWmodel';
import { OrdenService } from '../../../service/orden/orden.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { ClienteService } from '../../../service/cliente/cliente.service';
import { ResponseVWCliente } from '../../../models/cliente/response-VMCliente.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';

@Component({
  selector: 'app-mant-register-orden',
  templateUrl: './mant-register-orden.component.html',
  styleUrls: ['./mant-register-orden.component.css']
})
export class MantRegisterOrdenComponent implements OnInit {
  @Input() title :String=""
  @Input() orden :ResponseListOrden= new ResponseListOrden() 
  @Input() accion :number= 0 


  @Output () closeModalEmmit = new EventEmitter<boolean>()
  myForm : FormGroup
  responseProducto : ResponseProducto []=[]
  responseUnidad : ResponseUnidad []=[]
  responseVwCliente: ResponseVWCliente[] = [];
  envioOrder:RequestVWOrden=new RequestVWOrden()
  constructor (
    private fb:FormBuilder,
    
    private _clienteService : ClienteService,
    private _ordenService:OrdenService,
    private _productoService : ProductoService,
    private _unidadService:UnidadService
  )
  {

    const dataNow = new Date();
    
    const idUsuario = sessionStorage.getItem('idUsuario');
    const datoVerdader = "true"
    this.myForm = this.fb.group(
      {
        idOrden: [{value:0,disabled:true},[Validators.required]],
        nombreProd:  [Validators.required],
        fechaOrden:  [{value:dataNow},Validators.required],
        fechaRequerido:  [Validators.required],
        codigoOrden:  [Validators.required],
        estadoOrden: [{value:"datoVerdader"},Validators.required],
        nombreCliente:  [Validators.required],
        precioUnitario: [Validators.required],
        montoTotal: [Validators.required],
        cantidad: [Validators.required],
        idUsuario: [{value:idUsuario},[Validators.required]],
      }
    )
    
  }
  ngOnInit(): void {
    console.log(this.title)
    this.myForm.patchValue(this.orden);
    this.listarClientes()
    this.listarProductos()
    this.listarUnidad()
  }
  calcularMontoTotal(cantidad:number,precioProducto:number)
  {
    var monto = cantidad*precioProducto
    return monto
  }
  listarProductos()
  {
    this._productoService.getAll().subscribe({
      next: (data:ResponseProducto[])=>{
        this.responseProducto = data 
        console.log("Productos",data)
      },
      error: (error)=>{
        alert("Ocurrio Un error ")
      },      
      complete: ()=>{}
    })
  }
  listarUnidad ()
  {
    this._unidadService.getAll().subscribe(
      {
        next:(data:ResponseUnidad[])=>{this.responseUnidad=data}
      }
    )
  }
  listarClientes()
  {
    this._clienteService.getAll().subscribe({
      next:(data:ResponseVWCliente[])=>{
        this.responseVwCliente=data
        console.log(data)
      },
      error:(error)=>{
        alert("OCURRIO UN ERROR ")
      },
      complete:()=>{}
    
  }
)
}
  guardar()
  {
    debugger
    this.envioOrder = this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear: 
        this.crearorden()
        break;
      case AcciontConstants.editar: 
        this.editarorden()
        break;
      case AcciontConstants.eliminar: 
        break;
      
    }
     console.log(this.myForm.getRawValue())
  }
  crearorden()
  {
    this._ordenService.create(this.envioOrder).subscribe(
      {
        next : () => {
          alert_sucess("Se ha Creado el Modelo correctamente")
        },
        error :() => {
          alert_error("No se pudo crear el Modelo ")
        },
        complete :() => {}
      }
    )
  }
  editarorden()
  {
    this._ordenService.update(this.envioOrder).subscribe
    (
      {
        next : () => {
          alert_sucess("Se ha Actaulizado el Modelo correctamente")
        },
        error : () => {},
        complete : () => {}
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