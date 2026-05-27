import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseVWProveedor } from '../../../models/proveedor/responseVWProveedor.model';
import { ProveedorService } from '../../../service/proveedor/proveedor.service';
import { ResponseProveedor } from '../../../models/proveedor/responseProveedor.model';
import { ComprobanteProveedorService } from 'src/app/services/comprobanteProveedor/comprobante-proveedor.service';
import { RequestComprobanteProveedor } from '../../../models/proveedor/requestPedidoProveedor.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-proveedor-register',
  templateUrl: './mant-proveedor-register.component.html',
  styleUrls: ['./mant-proveedor-register.component.css']
})
export class MantProveedorRegisterComponent {
/**
   * TODO: Declaracion INPUT SALIDAS
   */

@Input () title : string = ""
@Input ( ) pedidoProveedor : ResponseVWProveedor = new ResponseVWProveedor()
@Input () accion : number = 0
/**
 * TODO: Declaracion OUPUT ENTRADAS 
 */
@Output () closeModalEmmit  = new EventEmitter<boolean>()
/**
 * TODO: Declaracion PARA EL FORMULARIO
 */
myForm : FormGroup

responseWProvedor : ResponseVWProveedor [] =[]
responseProvedor: ResponseProveedor [] =[]
envioComprobanteProveedor:RequestComprobanteProveedor= new RequestComprobanteProveedor()
constructor
(
  private fb:FormBuilder,
  private _proveedorService : ProveedorService,
  private _comprobanteProveedor:ComprobanteProveedorService

)
{
  this.myForm = this.fb.group
  (
    {
      fechaEntrega:[null,Validators.required],
      fechaPedido:[null,Validators.required],
      nombreProveedor:[null,Validators.required],
      costeTransporte: [null,Validators.required],
      idComprobante: [{value:0,disabled:true},[Validators.required]],
      tipoComprobante:[null,Validators.required],
      codigoComprobante:[null,Validators.required],
      idProvedor: [{value:0,disabled:true},[Validators.required]],
      montoTotal:[null,Validators.required],
      cantidadTotal: [null,Validators.required],
      subTotal:[null,Validators.required]  
    }
  )
}
listarProveedores()
{
    this._proveedorService.filtroProductoAcabado().subscribe(
      {
        next:(data:ResponseVWProveedor[])=>{
          this.responseWProvedor = data
          console.log("Proveedores",data)
        },
        error:()=>{},
        complete:()=>{}
      }
    )
}
crearPedidoProveedor()
{
  this._comprobanteProveedor.create(this.envioComprobanteProveedor).subscribe
  (
    {
      next:() => {
        alert_sucess("Se ha Credo correctamente")
      },
      error:() => {},
      complete:() => {}
    }
  )
}

guardar()
{
  
  this.envioComprobanteProveedor = this.myForm.getRawValue()
  switch(this.accion)
  {
    case AcciontConstants.crear :
      this.crearPedidoProveedor()
    break;
    case AcciontConstants.editar :

    break;
    case AcciontConstants.eliminar :
      
    break;
  }
}
ngOnInit(): void {
  this.myForm.patchValue(this.pedidoProveedor)
  this.listarProveedores()
}

}
