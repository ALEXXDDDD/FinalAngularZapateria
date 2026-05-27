import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseVWProveedor } from '../../../models/proveedor/responseVWProveedor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMaterial } from '../../../models/material/material-response.model';
import { ResponseProveedor } from '../../../models/proveedor/responseProveedor.model';
import { RepsonseComprobante } from '../../../models/comprobante/comprobanteVenta.model';
import { RequestComprobanteDetalle } from '../../../models/proveedor/requestRegistroPedidoProvedor.model';
import { MaterialService } from '../../../service/material/material.service';
import { ComprobanteDetalleService } from 'src/app/services/comprobante/comprobante-detalle.service';
import { ResponseVWMaterial } from '../../../models/material/material-responseVW.model';
import { ComprobanteProveedorService } from 'src/app/services/comprobanteProveedor/comprobante-proveedor.service';
import { alert_sucess } from 'src/app/funcionts/general.funcionts';
import { AcciontConstants } from 'src/app/constants/general.constans';

@Component({
  selector: 'app-mant-comprobante-detall-register',
  templateUrl: './mant-comprobante-detall-register.component.html',
  styleUrls: ['./mant-comprobante-detall-register.component.css']
})
export class MantComprobanteDetallRegisterComponent implements OnInit {
  
  /**
   * TODO: Declaracion INPUT SALIDAS
   */

  @Input () title : string = ""
  @Input ( ) proveedor : ResponseVWProveedor = new ResponseVWProveedor()
  @Input () accion : number = 0
  /**
   * TODO: Declaracion OUPUT ENTRADAS 
   */
  @Output () closeModalEmmit  = new EventEmitter<boolean>()
  /**
   * TODO: Declaracion PARA EL FORMULARIO
   */
  myForm : FormGroup

  responseMaterial : ResponseMaterial [] =[]
  responseWMaterial:ResponseVWMaterial[]=[]
  responseProveedor : ResponseProveedor[]=[]
  responseVWProveedor:ResponseVWProveedor[]=[]
  responseComprobante:RepsonseComprobante[]=[]

  envioSelectDetalle : RequestComprobanteDetalle = new RequestComprobanteDetalle()

  constructor
  (
    private fb:FormBuilder,
    private _materialService:MaterialService,
    private _comprobanteDetalleService:ComprobanteDetalleService,
    private _comprobanteProveedor:ComprobanteProveedorService
  )
  {
    this.myForm = this.fb.group
    (
      {
        cantidad:[null,Validators.required],
        idComprobante: [{value:0,disabled:true},[Validators.required]],
        nombreMaterial:[null,[Validators.required]],
        codigoComprobante:[null,[Validators.required]],
        idMaterial: [{value:0,disabled:true},[Validators.required]],
        precioUnitario:[null,Validators.required],
        idUnidad:[null,Validators.required],
      }
    )
  }
  listarMaterial()
  {
      this._materialService.getAll().subscribe(
        {
          next:(data:ResponseVWMaterial[])=>{
            this.responseWMaterial = data
            console.log("Materiales",data)
          },
          error:()=>{},
          complete:()=>{}
        }
      )
  }
  listarComprobantePorveedor()
  {
    this._comprobanteProveedor.getAllProveedorPedido().subscribe(
      {
        next:(data:ResponseVWProveedor[])=>{this.responseVWProveedor= data }
      }
    )
  }
  crearDetalleComprobante()
  {
    this._comprobanteDetalleService.create(this.envioSelectDetalle).subscribe
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
  // editarProducto()
  // {
  //   this._productoService.update(this.envioProducto).subscribe
  //   (
  //     {
  //       next:() => {
  //         alert_sucess("Se ha Actualizado correctamente")
  //       },
  //       error:() => {
  //         alert_error("No se pudo guardar el producto")
  //       },
  //       complete:() => {}
  //     }
  //   )
  // }
  guardar()
  {
    debugger
    this.envioSelectDetalle = this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear :
        this.crearDetalleComprobante()
      break;
      case AcciontConstants.editar :
     
      break;
      case AcciontConstants.eliminar :
        
      break;
    }
  }
  ngOnInit(): void {
    this.myForm.patchValue(this.envioSelectDetalle)
   this.listarComprobantePorveedor()
   this.listarMaterial()
  }

}
