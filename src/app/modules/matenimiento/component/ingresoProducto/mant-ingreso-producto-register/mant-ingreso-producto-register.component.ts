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
  responseProducto : ResponseProducto []=[]
  productoEnviar : ResponseProducto = new ResponseProducto ()
  requestIngresoProducto: RequestIngresoProducto = new RequestIngresoProducto();
  responseVProduccion: ResponseVProduccion[] = [];
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produccionService: ProduccionService,
    private _productoService : ProductoService,
    private ingresoProductoService: IngresoProductoService
  ) {
    this.myForm = this.fb.group({
      idProduccion: [{ value: 0, disabled: true }, Validators.required],
      idProducto: [{ value: 0, disabled: true }, Validators.required],
      nombreProd:[null,Validators.required],
      cantidad: [null, Validators.required],
      fechaIngreso: [null, Validators.required],
      codigoProduccion: [null, Validators.required],
      idUnidad: [{ value: 0, disabled: true }, Validators.required],
      idIngresoProducto: [{ value: 0, disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarProductos()
    this.inicializarDatos();
  }

  inicializarDatos(): void {
    this.listarProduccion();
    this.listarProduccionSinAcciones();
    this.myForm.patchValue(this.requestIngresoProducto);
  }

  listarProduccion(): void {
    this.produccionService.getAll().subscribe({
      next: (data: ResponseProduccion[]) => {
        this.Produccion = data;
      },
      error: () => {
        this.mostrarError("No se pudo cargar la data de producción.");
      }
    });
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
    if (this.myForm.valid) {
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
    } else {
      this.mostrarError("Por favor, complete todos los campos obligatorios.");
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
