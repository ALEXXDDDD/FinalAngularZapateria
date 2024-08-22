import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoResponseVDCredito.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResquestVDetalleCredito } from '../../../models/detalleCredito/detalleCreditoRequestVDCredito.model';
import { DetalleCreditoService } from '../../../service/detalleCredito/detalle-credito.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseOrden } from '../../../models/orden/orden-response.model';
import { OrdenService } from '../../../service/orden/orden.service';
import { alert_error } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-detalle-credito-register',
  templateUrl: './mant-detalle-credito-register.component.html',
  styleUrls: ['./mant-detalle-credito-register.component.css']
})
export class MantDetalleCreditoRegisterComponent implements OnInit {
  
  @Input() title :string=""
  @Input() responseVwDetalleCredito: ResponseVDetalleCredito = new ResponseVDetalleCredito();

  @Input() accion :number=0

  //Output

  @Output () closeModalEmmit = new EventEmitter<boolean>()
  //Declaracion de Variables 

  myForm:FormGroup
  requestDetalleCredito:ResquestVDetalleCredito = new ResquestVDetalleCredito();
  responseOrden:ResponseOrden[]=[]
  responseVDetalleCredito:ResponseVDetalleCredito[]=[]
  num: string = "";
  doc: string = "";

  constructor(
    private fb : FormBuilder,
    private _detalleCreditoService:DetalleCreditoService,
    private _ordenService:OrdenService
  )
  {
    this.myForm = this.fb.group(
      {
        montoAmortizacion: [null,[Validators.required]] ,
        fechaAmortizacion: [null,[Validators.required]] ,
        codigoOrden: [null,[Validators.required]] ,
        idOrden: [null,[Validators.required]] ,
        nombrePersona: ["null",[Validators.required]] ,
        relacionCliente: [null,[Validators.required]]  ,
        idCredito: [null,[Validators.required]] ,
        idDetalleCredito: [{value:0,disabled:true},[Validators.required]] ,


      }
    )
  }

  ngOnInit(): void {

    console.log("Titulo =>",this.title);
    console.log("Titulo =>",this.responseVwDetalleCredito);
    this.myForm.patchValue(this.responseVwDetalleCredito)
    this.listarOrden()
    
  }
  /**
   * TODO: CRUD Guardar los datos a la base de datos
   */
  guardar()
  {
    this.requestDetalleCredito = this.myForm.getRawValue()
   /*  this.requestDetalleCredito.estado = ConvertToBoolean(this.myForm.getRawValue().estado); */
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
  crearCredito()
    {
      this._detalleCreditoService.create(this.requestDetalleCredito).subscribe(
        {
          next: (data:ResquestVDetalleCredito) => 
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
      this._detalleCreditoService.update(this.requestDetalleCredito).subscribe(
        {
          next: (data:ResquestVDetalleCredito) => 
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
