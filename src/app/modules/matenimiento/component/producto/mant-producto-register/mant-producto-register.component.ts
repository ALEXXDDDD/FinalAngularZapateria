import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestProducto } from '../../../models/producto/producto-request.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-producto-register',
  templateUrl: './mant-producto-register.component.html',
  styleUrls: ['./mant-producto-register.component.css']
})
export class MantProductoRegisterComponent implements OnInit {
  
  /**
   * TODO: Declaracion INPUT SALIDAS
   */

  @Input () title : string = ""
  @Input ( ) producto : ResponseProducto = new ResponseProducto()
  @Input () accion : number = 0
  /**
   * TODO: Declaracion OUPUT ENTRADAS 
   */
  @Output () closeModalEmmit  = new EventEmitter<boolean>()
  /**
   * TODO: Declaracion PARA EL FORMULARIO
   */
  myForm : FormGroup

  responseProducto : ResponseProducto [] =[]
  envioProducto : RequestProducto = new RequestProducto()

  constructor
  (
    private fb:FormBuilder,
    private _productoService : ProductoService
  )
  {
    this.myForm = this.fb.group
    (
      {
      idProducto:[{value:0,disable:true},[Validators.required]],
      nombreProd: [null,Validators.required],
      codigoProd: [null,Validators.required],
      precioUnitario:  [null,Validators.required],
      idUnidad:  [null,Validators.required],
      stock:  [null,Validators.required],
      estadoProducto:  [null,Validators.required],
      fotografia: [null,Validators.required],
      }
    )
  }
  crearProducto()
  {
    this._productoService.create(this.envioProducto).subscribe
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
  editarProducto()
  {
    this._productoService.update(this.envioProducto).subscribe
    (
      {
        next:() => {
          alert_sucess("Se ha Actualizado correctamente")
        },
        error:() => {
          alert_error("No se pudo guardar el producto")
        },
        complete:() => {}
      }
    )
  }
  guardar()
  {
    this.envioProducto = this.myForm.getRawValue()
    switch(this.accion)
    {
      case AcciontConstants.crear :
        this.crearProducto()
      break;
      case AcciontConstants.editar :
        this.editarProducto()
      break;
      case AcciontConstants.eliminar :
        
      break;
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
