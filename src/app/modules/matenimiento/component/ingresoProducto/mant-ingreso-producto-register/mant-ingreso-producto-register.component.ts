import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseProduccion } from '../../../models/Produccion/produccion-response.model';
import { ProduccionService } from '../../../service/produccion/produccion.service';
import { IngresoProductoService } from '../../../service/ingresoProducto/ingreso-producto.service';
import { RequestIngresoProducto } from '../../../models/ingreso-producto/ingreso-producto-request.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseVProduccion } from '../../../models/Produccion/responseProduccion.model';
import { alert_error } from 'src/app/funcionts/general.funcionts';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';
import { ResponseVWProduccion } from '../../../models/Produccion/produccion-reponseVW.model';
import { OrdenService } from '../../../service/orden/orden.service';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { ResponseVWEmpleado } from '../../../models/empleado/empleadoVW-response.model';
import { EmpleadoService } from '../../../service/empleado/empleado.service';
import { ResponseEmpleado } from '../../../models/empleado/response-list-empleado.models';
import { RequestVWDetalleProduccion } from '../../../models/DetalleProduccion/DetalleProduccion-requestVW.model';
import { DetalleProduccionService } from '../../../service/detalleProduccion/detalle-produccion.service';

@Component({
  selector: 'app-mant-ingreso-producto-register',
  templateUrl: './mant-ingreso-producto-register.component.html',
  styleUrls: ['./mant-ingreso-producto-register.component.css']
})
export class MantIngresoProductoRegisterComponent implements OnInit {
  @Input() title: string = "";
  @Input() produccion: any;
  @Input() accion: number = 0;

  @Output() closeModalEmmit = new EventEmitter<boolean>();

  // Variables
  Produccion: ResponseProduccion[] = [];
  responseProducto: ResponseProducto[] = [];
  produccion1: ResponseVWProduccion[] = [];
  responseListOrden : ResponseListOrden[]=[]
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  productoEnviar: ResponseProducto = new ResponseProducto();
  requestIngresoProducto: RequestIngresoProducto = new RequestIngresoProducto();
  requestDetalleProduccion :RequestVWDetalleProduccion  = new  RequestVWDetalleProduccion();
  responseVProduccion: ResponseVProduccion[] = [];
  reponseEmpleado:ResponseEmpleado[]=[];
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produccionService: ProduccionService,
    private _OrdenService: OrdenService,
    private _empleadoService:EmpleadoService,
    private _productoService: ProductoService,
    private _detalleProduccion: DetalleProduccionService,
    private ingresoProductoService: IngresoProductoService
  ) {
    this.myForm = this.fb.group({
      idProduccion: [{ value: 0, disabled: true }, Validators.required],
      idProducto: [{ value: 0, disabled: true }, Validators.required],
      nombreProd: [null, Validators.required],
      nombreEmpleado: [null, Validators.required],
      cantidad: [null, Validators.required],
      cantidadFaltante: [{ value: null, disabled: true }, Validators.required],
      fechaIngreso: [{value:this.obtenerFechaHoy(), disabled: true}, Validators.required],
      descripcion: [null, Validators.required],
      codigoProduccion: [null, Validators.required],
      codigoOrden: [null, Validators.required],
      idUnidad: [{ value: 0, disabled: true }, Validators.required],
      idIngresoProducto: [{ value: 0, disabled: true }, Validators.required],
    });
  }
  obtenerFechaHoy():string
  {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;

  }
  ngOnInit(): void {
    this.listarProductos();
    this.inicializarDatos();
    this.estCantidad()
    this.filtrarOrdenAcIna('Activo');
    this.cargarDatosFormulario();
    this.listarEmpleado();
    if(this.produccion)
    {
      this.myForm.patchValue(this.produccion)
    }
    
    this.myForm.get('codigoProduccion')?.valueChanges.subscribe(value => {
      this.actualizarCantidad(value);
    });
  }
  listarEmpleado():void
  {
    this._empleadoService.getAll().subscribe({
      next: (data: ResponseEmpleado[]) => {
        this.reponseEmpleado = data;
      },
      error: () => {
        this.mostrarError("No se encontro empleados.");
      }  

  })
  }
  ngOnChanges(changes:SimpleChanges): void {
    if (changes['Produccion'] && changes['Produccion'].currentValue) {
      this.myForm.patchValue(changes['Produccion'].currentValue);
      this.cargarDatosFormulario();
    }
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
  estCantidad(): boolean {
    
    const cantidadFaltante = this.myForm.get('cantidadFaltante')?.value;
    return cantidadFaltante === 0;
  }


  inicializarDatos(): void {
    this.listarProduccion("Activo");
    this.listarProduccionSinAcciones();
    this.myForm.patchValue(this.requestIngresoProducto);
  }
  extraerSoloNombreProducto(codigo:string):string
  {
      if (!codigo) return '';

    const partes = codigo.split('-');

    // Estructura: PRODUCCION - ZAPATOS - NEGROS - NEGRO - 01
    if (partes[0]?.toUpperCase() === 'PRODUCCION' && partes.length >= 3) {
      // Une 'Zapatos' + ' ' + 'Negros'
      return `${partes[1]} ${partes[2]}`.trim(); 
    }

    return codigo;
  }
  cargarDatosFormulario()
  {
    if (!this.produccion) return;
    const fechaInicioRecibida = this.produccion.fechaInicio || this.produccion.fechaRegistro || null;
    // 1. Cargamos los valores generales primero (como cantidadFaltante, fecha, etc.)
    this.myForm.patchValue({
      fechaInicio :fechaInicioRecibida,
      fechaIngreso: this.obtenerFechaHoy(),
      codigoOrden: this.produccion.codigoOrden,
      cantidadFaltante: this.produccion.cantidadFaltante,
      cantidad: this.produccion.cantidad || 0,
      descripcion: this.produccion.descripcion
    });

  // 2. Asignar y seleccionar CÓDIGO DE PRODUCCIÓN
  if (this.produccion.codigoProduccion) {
      this.myForm.patchValue({
        codigoProduccion: this.produccion.codigoProduccion
      });

      // Extraemos "Zapatos Negros" a partir del código
      const nombreExtraido = this.extraerSoloNombreProducto(this.produccion.codigoProduccion);

      // Buscamos si existe en el arreglo de productos para tomar su formato de texto exacto
      if (this.responseProducto && this.responseProducto.length > 0) {
        const productoEncontrado = this.responseProducto.find(p => 
          p.nombreProd?.trim().toLowerCase() === nombreExtraido.toLowerCase()
        );

        if (productoEncontrado) {
          // Asigna "Zapatos Negros" tal cual está en el <option>
          this.myForm.patchValue({ nombreProd: productoEncontrado.nombreProd });
        } else {
          this.myForm.patchValue({ nombreProd: nombreExtraido });
        }
      } else {
        // Si la lista de productos aún no carga, asignamos el extraído
        this.myForm.patchValue({ nombreProd: nombreExtraido });
      }
    }

    // 3. Bloquear / Inhabilitar los select de Código y Producto
    this.myForm.get('fechaIngreso')?.disable();
    this.myForm.get('fechaInicio')?.disable();
    this.myForm.get('codigoProduccion')?.disable();
    this.myForm.get('nombreProd')?.disable();
  }
  actualizarCantidad(codProduccion: string): void {
    
    const produccion = this.produccion1.find(p => p.codigoProduccion === codProduccion);
    if (produccion) {
      this.myForm.get('cantidadFaltante')?.setValue(produccion.cantidadFaltante, { emitEvent: false });
      this.myForm.get('codigoOrden')?.setValue(produccion.codigoOrden, { emitEvent: false });
    }
  }

  listarProduccion(nombre:string): void {
    this.nombreRol.nombre = nombre;
    this.produccionService.genericFiltroProduccionActivo(this.nombreRol).subscribe({
      next: (data: ResponseVWProduccion[]) => {
        this.produccion1 = data;
      },
      error: () => {
        this.mostrarError("No se pudo cargar la data de producción.");
      }
    });
  }

  listarProductos(): void {
    this._productoService.getAll().subscribe({
      next: (data: ResponseProducto[]) => {
        this.responseProducto = data;
        this.cargarDatosFormulario();
      },
      error: (error) => {
        alert("Ocurrió un error");
      },
      complete: () => { }
    });
  }

  listarProduccionSinAcciones(): void {
    this.produccionService.GetProduccion().subscribe({
      next: (data: ResponseVProduccion[]) => {
        this.responseVProduccion = data;
      },
      error: () => {
        this.mostrarError("No se pudo cargar la data de producción sin acciones.");
      }
    });
  }

  guardar(): void {
    debugger
    if (this.myForm.get('cantidadFaltante')?.value === 0) {
      // Mostrar un mensaje de error
      this.mostrarError("La cantidad faltante es 0. No se puede proceder.");
      return; // No continuar con la creación
    }
    // getRawValue() extrae tanto los campos activos como los que están disabled
    const rawForm = this.myForm.getRawValue();

    // Capturamos la fecha/hora actual en formato ISO para C#
    const fechaActualIso = new Date().toISOString();

    // Objeto exacto que coincide con RequestDetalleProduccion
    const payloadBackend = {
      idDetalleProduccion: rawForm.idDetalleProduccion || 0,
      idProduccion: rawForm.idProduccion,
      codigoProduccion: rawForm.codigoProduccion,
      idOrden: rawForm.idOrden || 0,
      codigoOrden: rawForm.codigoOrden || '',
      
      // Datos del Empleado traído de la lista
      idEmpleado: rawForm.idEmpleado || 0,
      nombreEmpleado: rawForm.nombreEmpleado || '',

      // Unidad fija: PARES
      idUnidad: rawForm.idUnidad || 1,
      nombreUnidad: 'PARES',

      // Área fija: PRODUCCION
      idArea: rawForm.idArea || 1,

      // Cantidad a ingresar
      cantidadProduccion: Number(rawForm.cantidad),

      // Fechas: Ambas toman el día de hoy
      fechaRegistro: fechaActualIso,
      fechaFinalizado: fechaActualIso,

      nombreProd:rawForm.nombreProd || '',
      // Estado y Observaciones
      estado: 'REGISTRADO',
      descripcion: rawForm.descripcion || ''
    };
    
    
    switch (this.accion) {
      case AcciontConstants.crear:
        this.crearDetalleProduccion(payloadBackend);
        break;
      case AcciontConstants.editar:
        this.crearDetalleProduccion(payloadBackend);
        break;
      case AcciontConstants.eliminar:
        this.eliminarIngresoProducto();
        break;
    }
  }

  crearIngresoProducto(): void {
    this.ingresoProductoService.create(this.requestIngresoProducto).subscribe({
      next: () => {
        this.cerrarModal(true);
      },
      error: () => {
        this.mostrarError("No se pudo crear el ingreso de producto.");
      }
    });
  }
  crearDetalleProduccion(request: RequestVWDetalleProduccion):void{
    debugger
    request.nombreEmpleado = this.myForm.get('nombreEmpleado')?.value || request.nombreEmpleado || '';
    this._detalleProduccion.create(request).subscribe({
      next: () => {
        this.cerrarModal(true);
      },
      error: () => {
        this.mostrarError("No se pudo registrar el detalle de producción.");
      }
    });
  }
  editarIngresoProducto(): void {
    // Lógica para editar un ingreso de producto
  }

  eliminarIngresoProducto(): void {
    // Lógica para eliminar un ingreso de producto
  }

  cerrarModal(resultado: boolean): void {
    this.closeModalEmmit.emit(resultado);
  }

  mostrarError(mensaje: string): void {
    // Aquí puedes implementar una función global de notificaciones o alerts
    alert_error(mensaje);
  }
}
