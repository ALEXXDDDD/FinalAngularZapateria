import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestVWProduccion } from '../../../models/Produccion/produccion-requestVW.model';
import { ResponseVWMaterial } from '../../../models/material/material-responseVW.model';
import { ResponseMaterial } from '../../../models/material/material-response.model';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduccionService } from '../../../service/produccion/produccion.service';
import { ResponseVWProduccion } from '../../../models/Produccion/produccion-reponseVW.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { Router } from '@angular/router';
import { RequestVWIngresoProducto } from '../../../models/ingresoProducto/requestVWIngresoProducto.model';
import { ResponseProduccion } from '../../../models/Produccion/produccion-response.model';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';
import { OrdenService } from '../../../service/orden/orden.service';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';

@Component({
  selector: 'app-mant-produccion-register',
  templateUrl: './mant-produccion-register.component.html',
  styleUrls: ['./mant-produccion-register.component.css']
})
export class MantProduccionRegisterComponent implements OnInit {
  /**
   * TODO inPUT 
   */
  @Input () title :string=""
  @Input () Produccion : ResponseProduccion = new ResponseProduccion()

  @Input () ingresoProducto : RequestVWIngresoProducto = new RequestVWIngresoProducto()
  @Input() accion :number=0

  @Output () closeModalEmmit  = new EventEmitter<boolean>()
 
  myForm : FormGroup
  responseProducto : ResponseProducto []=[]
  ProduccionEnvio : RequestVWProduccion = new RequestVWProduccion ()
  ingresoProductoEnvio : RequestVWIngresoProducto = new RequestVWIngresoProducto()
  responseVWMaterial : ResponseVWMaterial [] = []
  response : ResponseMaterial [] = []
  produccion:ResponseVWProduccion[]=[]
  responseListOrden : ResponseListOrden[]=[]
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  responseMaterial :ResponseMaterial = new ResponseMaterial()
  responseUnidad : ResponseUnidad[] = []
  orden: ResponseListOrden[] = [];
  responseProduccion : ResponseVWProduccion []=[]
  materialSelect : ResponseVWMaterial = new ResponseVWMaterial ()
  constructor
  (
    private _ProduccionService : ProduccionService,
    private _router : Router,
     private _fb : FormBuilder,
     private _productoService : ProductoService,
     private _OrdenService: OrdenService,
     private _produccionService: ProduccionService,
     private _unidadService : UnidadService
  )
  {
    this.myForm = this._fb.group
    (
      {
        idProduccion: [{value:0,disabled:true}],
        nombreProd: [null,Validators.required] ,
        fechaInicio : [null,Validators.required],
        meta : [null,Validators.required],
        codigoOrden: [null,Validators.required],
        estadoProduccion : [null,Validators.required],
        descripcion: [null,Validators.required],
        cantidadFaltante  : [null,Validators.required],
        codigoProduccion : [{value:'',disabled:true}] ,
        nombreUnidad: [null,Validators.required] ,
        idUnidad : [{value:0,disabled:true}],
        fechaFin: [null,Validators.required],
        color: [null,Validators.required],
      }
    )
  }
  /**
   * Genera código de producción automáticamente
   * Formato: PRODUCCION-NOMBRE-PRODUCTO-COLOR-XX
   * Ej: PRODUCCION-ZAPATO-ROJO-01, PRODUCCION-ZAPATO-ROJO-02, etc.
   */
  generarCodigoProduccion() {
    const nombreProd = this.myForm.get('nombreProd')?.value;
    const color = this.myForm.get('color')?.value;

    if (nombreProd && color) {
      // Limpiar nombre y color: convertir a mayúscula y reemplazar espacios
      const nombreLimpio = nombreProd.toUpperCase().replace(/\s+/g, '-');
      const colorLimpio = color.toUpperCase().replace(/\s+/g, '-');
      
      // Obtener el siguiente número disponible
      const prefijo = `PRODUCCION-${nombreLimpio}-${colorLimpio}`;
      const siguienteNumero = this.obtenerSiguienteNumero(prefijo);
      const numeroFormato = String(siguienteNumero).padStart(2, '0');
      
      const codigoGenerado = `${prefijo}-${numeroFormato}`;
      
      console.log('Código generado:', codigoGenerado);
      
      // Establecer el código sin emitir eventos
      this.myForm.get('codigoProduccion')?.setValue(codigoGenerado, { emitEvent: false });
    }
  }

  /**
   * Obtiene el siguiente número disponible basado en códigos existentes
   * Busca códigos que empiecen con el prefijo y encuentra el siguiente número secuencial
   */
  obtenerSiguienteNumero(prefijo: string): number {
    if (!this.responseProduccion || this.responseProduccion.length === 0) {
      return 1; // Si no hay datos, empezar en 1
    }

    // Filtrar códigos que empiecen con el prefijo
    const codigosRelacionados = this.responseProduccion
      .filter(prod => prod.codigoProduccion && prod.codigoProduccion.startsWith(prefijo))
      .map(prod => {
        // Extraer el número del final del código (ej: PRODUCCION-ZAPATO-01 → 01)
        const partes = prod.codigoProduccion.split('-');
        const numero = parseInt(partes[partes.length - 1], 10);
        return isNaN(numero) ? 0 : numero;
      })
      .sort((a, b) => a - b);

    // Si no hay códigos relacionados, empezar en 1
    if (codigosRelacionados.length === 0) {
      return 1;
    }

    // Encontrar el siguiente número disponible
    for (let i = 1; i <= codigosRelacionados.length + 1; i++) {
      if (!codigosRelacionados.includes(i)) {
        return i;
      }
    }

    return codigosRelacionados[codigosRelacionados.length - 1] + 1;
  }

  ngOnInit(): void {
    this.myForm.patchValue(this.responseUnidad)
    this.myForm.patchValue(this.Produccion)
    this.filtrarOrdenAcIna('Activo')
    this.listarProductos()
    this.filtrarProduccionAcIna('Activo')
    this.listarUnidad()

    // Escuchar cambios de nombreProd para auto-generar código
    this.myForm.get('nombreProd')?.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.generarCodigoProduccion();
      }, 100);
    });

    // Escuchar cambios de color para auto-generar código
    this.myForm.get('color')?.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.generarCodigoProduccion();
      }, 100);
    });

    // Generar código inicial si ya hay datos (modo edición)
    if (this.accion !== AcciontConstants.crear && this.Produccion) {
      setTimeout(() => {
        this.generarCodigoProduccion();
      }, 200);
    }
  }
  filtrarProduccionAcIna(nombre:string)
  {



    this.nombreRol.nombre = nombre;

    this._produccionService.genericFiltroProduccionActivo(this.nombreRol).subscribe({
      next: (data: ResponseVWProduccion[]) => {
        this.responseProduccion = data; // Actualiza la lista con la respuesta filtrada
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => { }
    });
  }
  filtrarOrdenAcIna(nombre:string)
  {



    this.nombreRol.nombre = nombre;

    this._OrdenService.genericFiltroOrdenActivo(this.nombreRol).subscribe({
      next: (data: ResponseListOrden[]) => {
        this.responseListOrden = data; // Actualiza la lista con la respuesta filtrada
        console.log("Orden Activo",data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => { }
    });
  }
  guardar()
  {
    debugger;
    

    // Asegurar que tanto nombreProd como color están seleccionados
    const nombreProd = this.myForm.get('nombreProd')?.value;
    const color = this.myForm.get('color')?.value;
    
    if (!nombreProd) {
      alert_error("Por favor selecciona un nombre de producto");
      return;
    }

    if (!color) {
      alert_error("Por favor ingresa el color del producto");
      return;
    }

    // Generar código si es nueva producción
    if (this.accion === AcciontConstants.crear) {
      this.generarCodigoProduccion();
    }

    this.ProduccionEnvio = this.myForm.getRawValue()
    console.log("Código de producción:", this.ProduccionEnvio.codigoProduccion);
    
    switch(this.accion)
    {
      case AcciontConstants.crear:
        this.crearProduccion()
      break;
      case AcciontConstants.editar:
        this.editarSailda()
      break;
    }
    console.log(this.myForm.getRawValue())
  }
  crearProduccion()
  {
    debugger;
    this.ProduccionEnvio.codigoOrden = "PRODUCCION"
    this.ProduccionEnvio.estadoProduccion = "Activo"
    this.ProduccionEnvio.cantidadFaltante = this.ProduccionEnvio.meta
    console.log("Datos a enviar:", this.ProduccionEnvio);
    this._ProduccionService.create(this.ProduccionEnvio).subscribe(
      {
        next:()=>
          {
            alert_sucess("Se creo La Salida COrrectamente ")
          },
        error:(error)=>
          {
            alert_error("OCURRIO UN ERROR AL CREAR ")
          },
        complete:()=>{
          this.cerrarModal(true)
        }
      }
    )
  }
  editarSailda()
  {
    this._ProduccionService.update(this.ProduccionEnvio).subscribe
    (
      {
        next:(data:ResponseProduccion) => 
          {
            alert_sucess("Se ACTUALIZO LA SALIDA")
          },
        error:(error) => 
          {
            alert_error("Ocurrio un Error")
          },
        complete:() => {}
      }
    )
  }
  
  listarUnidad()
  {
    this._unidadService.getAll().subscribe(
      {
        next :(unidades:ResponseUnidad[])=>{
          this.responseUnidad = unidades
          console.log(unidades);
          
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
  listarProductos()
  {
    this._productoService.getAll().subscribe({
      next: (data:ResponseProducto[])=>{
        this.responseProducto = data 
        console.log(data)
      },
      error: (error)=>{
        alert("Ocurrio Un error ")
      },      
      complete: ()=>{}
    })
  }

}