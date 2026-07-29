import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestProducto } from '../../../models/producto/producto-request.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { RequestVProducto } from '../../../models/producto/requestVProducto.model';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { ResponseModelo } from '../../../models/modelo/modelo-response.model';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';

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
  responseModelo : ResponseModelo[]=[]  
  responseUnidad : ResponseUnidad []= [] 
  responseUnidadPares : ResponseUnidad []=[];
  envioProducto : RequestProducto = new RequestProducto()
  envioSelectProducto : RequestProducto = new RequestVProducto()

  constructor
  (
    private fb:FormBuilder,
    private _productoService : ProductoService,
    private _modeloService : ModeloService,
    private _unidadService:UnidadService
  )
  {
    this.myForm = this.fb.group
    (
      {
      idProducto: [{value:0,disabled:true}],
      idModelo: [{value:0,disabled:true}],
      nombreProd:[null],
      codigoProd:[{value:'',disabled:true}],
      nombreUnidad:[null],
      nombreModelo:[null],
      precioUnitario: [null],
      stock: [0],
      estadoProducto: [null],
      idUnidad: [null,],
      fotografia:["null"],
      color:[null],
      categoria:[null],
      talla: [null],
      descripcion:[null],
      idDetalleProducto: [{value:0,disabled:true}],
      }
    )
  }

  // En tu componente Angular al seleccionar el archivo <input type="file" (change)="onFileSelected($event)">
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      // Obtenemos la cadena base64 limpia (quitando el prefijo data:image/...;)
      const base64String = (reader.result as string).split(',')[1];
      this.myForm.patchValue({
        fotografia: base64String
      });
    };
    reader.readAsDataURL(file);
  }
}
  /**
   * Auto generar código de producto: PRODUCT-CAT-COLOR
   * Ej: PRODUCT-ZAP-ROJO
   */
  generarCodigoProducto() {
    const categoria = this.myForm.get('nombreModelo')?.value || '';
    const color = this.myForm.get('color')?.value || '';
    
    if (categoria && color) {
      // Tomar 3 primeras letras de categoría en mayúscula
      const catAbreviada = categoria.substring(0, 3).toUpperCase();
      const colorAbreviado = color.substring(0, 3).toUpperCase();
      const codigoGenerado = `PRODUCT-${catAbreviada}-${colorAbreviado}`;
      
      // Establecer el código sin emitir eventos para evitar bucles
      this.myForm.get('codigoProd')?.setValue(codigoGenerado, { emitEvent: false });
    }
  }
  listarModelos()
  {

      this._modeloService.getAll().subscribe(
        {
          next:(data:ResponseModelo[])=>{
            this.responseModelo = data
            console.log("Modelo",data)
          },
          error:()=>{},
          complete:()=>{}
        }
      )
  }
  crearProducto()
  {
    const categoria = this.myForm.get('nombreModelo')?.value || '';
    this.envioProducto.categoria = categoria; // Asignar la categoría al objeto de envío  
    this.envioProducto.estadoProducto = true; // Forzar estado a true para nuevo producto}
    this.envioProducto.nombreUnidad ="PARES"
    this.envioProducto.idUnidad = 0 // Forzar idUnidad a 2 para nuevo producto
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
    
    
    // Validar campos requeridos manualmente


    // Para editar: validar que stock sea mayor a 0
    if (this.accion === 2) { // AcciontConstants.editar === 2
      const stock = Number(this.myForm.get('stock')?.value);
      if (stock <= 0) {
        alert_error("El stock debe ser mayor a 0 en edición");
        return;
      }
    }

    // Stock siempre debe ser 0 para nuevo producto
    if (this.accion === 1) { // AcciontConstants.crear === 1
      this.myForm.get('stock')?.setValue(0, { emitEvent: false });
    }

    this.envioProducto = this.myForm.getRawValue()
    console.log("✅ Datos a enviar:", this.envioProducto);
    
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
    this.listarUnidad()
    this.listarModelos()
    
    // Si es nuevo producto, inicializar stock a 0
    if (this.accion === AcciontConstants.crear) {
      this.myForm.get('stock')?.setValue(0, { emitEvent: false });
    } else {
      // Si es editar, cargar datos del producto
      this.myForm.patchValue(this.producto);
    }

    // Escuchar cambios de categoría para auto generar código
    this.myForm.get('nombreModelo')?.valueChanges.subscribe(() => {
      this.generarCodigoProducto();
    });

    // Escuchar cambios de color para auto generar código
    this.myForm.get('color')?.valueChanges.subscribe(() => {
      this.generarCodigoProducto();
    });

    // Generar código inicial
    this.generarCodigoProducto();
  }
  cerrarModal(res:boolean)
  {
    this.closeModalEmmit.emit(res)
    //true Hubo modificacion en la base de datos
    

    //false => No hubo modificacion de la base de datos
  }
  listarUnidad ()
  {
    this._unidadService.getAll().subscribe(
      {
        next:(data:ResponseUnidad[])=>{
          this.responseUnidad=data;
          // Filtrar solo unidades con ID par
          this.responseUnidadPares = data.filter(u => u.idUnidad % 2 === 0);
        }
      }
    )
  }
}
