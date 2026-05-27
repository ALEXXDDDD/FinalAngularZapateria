import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-mant-ingreso-producto-register',
  templateUrl: './mant-ingreso-producto-register.component.html',
  styleUrls: ['./mant-ingreso-producto-register.component.css']
})
export class MantIngresoProductoRegisterComponent implements OnInit {
  @Input() title: string = "";
  @Input() produccion: ResponseProduccion = new ResponseProduccion();
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
  responseVProduccion: ResponseVProduccion[] = [];
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produccionService: ProduccionService,
    private _OrdenService: OrdenService,
    private _productoService: ProductoService,
    private ingresoProductoService: IngresoProductoService
  ) {
    this.myForm = this.fb.group({
      idProduccion: [{ value: 0, disabled: true }, Validators.required],
      idProducto: [{ value: 0, disabled: true }, Validators.required],
      nombreProd: [null, Validators.required],
      cantidad: [null, Validators.required],
      cantidadFaltante: [{ value: null, disabled: true }, Validators.required],
      fechaIngreso: [null, Validators.required],
      descripcion: [null, Validators.required],
      codigoProduccion: [null, Validators.required],
      codigoOrden: [null, Validators.required],
      idUnidad: [{ value: 0, disabled: true }, Validators.required],
      idIngresoProducto: [{ value: 0, disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarProductos();
    this.inicializarDatos();
    this.estCantidad()
    this.filtrarOrdenAcIna('Activo');
    
    this.myForm.get('codigoProduccion')?.valueChanges.subscribe(value => {
      this.actualizarCantidad(value);
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
  estCantidad(): boolean {
    
    const cantidadFaltante = this.myForm.get('cantidadFaltante')?.value;
    return cantidadFaltante === 0;
  }


  inicializarDatos(): void {
    this.listarProduccion("Activo");
    this.listarProduccionSinAcciones();
    this.myForm.patchValue(this.requestIngresoProducto);
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
    
    this.requestIngresoProducto = this.myForm.getRawValue();
    switch (this.accion) {
      case AcciontConstants.crear:
        this.crearIngresoProducto();
        break;
      case AcciontConstants.editar:
        this.crearIngresoProducto();
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
