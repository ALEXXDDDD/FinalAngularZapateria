import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { LoadStateEnum } from 'src/app/modules/matenimiento/models/core/utils/load-enum';
import { RequestProducto } from 'src/app/modules/matenimiento/models/producto/producto-request.model';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import { ResponseDetalleProducto } from 'src/app/modules/matenimiento/models/producto/producto-responseDetalleProducto.model';
import { ResponseVDetalleProducto } from 'src/app/modules/matenimiento/models/producto/producto-responseVDetalle.model';
import { ResponseDetalleProcedureProducto } from 'src/app/modules/matenimiento/models/producto/productoResponseDetalle.model';
import { DetalleProductoService } from 'src/app/modules/matenimiento/service/detalleProducto/detalle-producto.service';
import { ProductoService } from 'src/app/modules/matenimiento/service/producto/producto.service';

@Component({
  selector: 'app-listar-detalle',
  templateUrl: './listar-detalle.component.html',
  styleUrls: ['./listar-detalle.component.css']
})
export class ListarDetalleComponent {
  @Input() title :string=""
  @Input() Producto :ResponseProducto= new ResponseProducto() 
  @Input() DetalleProducto :ResponseVDetalleProducto= new ResponseVDetalleProducto() 
  @Input() accion :number= 0 

  /**
   * Variables de Salida 
   */
  @Output () closeModalEmmit = new EventEmitter<boolean>()
  responseVDetalle : ResponseVDetalleProducto[]=[]
  responseDetalle : ResponseDetalleProducto[]=[]
  detalleProductoResponse : ResponseDetalleProcedureProducto[] =[]
  responseProducto : ResponseProducto []=[]
  myForm:FormGroup 
  ProductoEnvio : RequestProducto = new RequestProducto()
  frmLoadSt = LoadStateEnum.None;
  loadStateEnum = LoadStateEnum;
  constructor (
    private fb:FormBuilder,
    private  _ProductoService:ProductoService,
    private _DetalleProducto:DetalleProductoService
  )
  {
    //Enviar el Producto Request 
    this.myForm = this.fb.group(
      {
        idProducto: [{value:0,disabled:true},[Validators.required]],
        nombreProducto: [null,Validators.required],
        descripProducto: [null]
      }
    )
  }
  carga:number = 1;
  
  ngOnInit(): void {
     
      this.myForm.patchValue(this.Producto)
      this.monstrarDetalleProducto(this.Producto.idProducto)
     
  }
  monstrarDetalleProducto(id:number)
  {

    this._DetalleProducto.getDetalle(id).subscribe(
      {
        next:(data:ResponseDetalleProcedureProducto[])=>{
          
          if (Array.isArray(data)) {
            this.frmLoadSt = LoadStateEnum.Success;
            this.detalleProductoResponse = data;
          } else {
            console.error('Data is not an array', data);
          }
         },
         error:()=>
         {
          this.frmLoadSt = LoadStateEnum.Error;
         }
      }
    )
  }
  save(name: string, lastName: string) {
    this.frmLoadSt = LoadStateEnum.Loading;

    // envio al servido
    setTimeout(() => {
      // guargador correcto
      alert('Se guardo');
      this.frmLoadSt = LoadStateEnum.Success;
    }, 4000);
  }
  cambiar(){
    
   }
  // guardar()
  // {
  //   this.ProductoEnvio = this.myForm.getRawValue()
  //   switch(this.accion)
  //   {
  //     case AcciontConstants.crear: 
  //       this.crearRegistro()
  //       break;
  //     case AcciontConstants.editar: 
  //       this.editarRegistro()
  //       break;
  //     case AcciontConstants.eliminar: 
  //       break;
      
  //   }
  //    console.log(this.myForm.getRawValue())


  // }
  // crearRegistro()
  // {
  //   this._ProductoService.create(this.ProductoEnvio).subscribe(
  //     {
  //       next: (data:ResponseProducto)=> {
  //         alert_sucess("Se ha Creado correctamente El Producto")
  //       },
  //       error: ()=> {
  //         alert_error("Ocurrio un error")
  //       },
  //       complete: ()=> {
  //         this.cerrarModal(true)
  //       }
  //     }
  //   )
  // }
  // editarRegistro ()
  //   {
  //     this._ProductoService.update(this.ProductoEnvio).subscribe(
  //       {
  //         next: (data:ResponseProducto)=> {
  //           alert_sucess("Se ha Actualizado correctamente")
            
  //         },
  //         error: ()=> {
  //           alert("Ocurrio un error")
  //         },
  //         complete: ()=> {
  //           this.cerrarModal(true)
  //         }
  //       }
  //     )
  

  // }
  cerrarModal(res:boolean)
  {
    this.closeModalEmmit.emit(res)
    //true Hubo modificacion en la base de datos
      

    //false => No hubo modificacion de la base de datos
  }
}
