import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { RequestVWOrden } from '../../../models/orden/orden-responseVWmodel';
import { OrdenService } from '../../../service/orden/orden.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { ClienteService } from '../../../service/cliente/cliente.service';
import { ResponseVWCliente } from '../../../models/cliente/response-VMCliente.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mant-register-orden',
  templateUrl: './mant-register-orden.component.html',
  styleUrls: ['./mant-register-orden.component.css']
})
export class MantRegisterOrdenComponent implements OnInit {
  @Input() title: string = "";
  @Input() orden: ResponseListOrden = new ResponseListOrden(); // Asegúrate de definir el tipo correcto
  @Input() accion: number = 0;

  @Output() closeModalEmmit = new EventEmitter<boolean>();
  myForm: FormGroup;
  mostrarInforme: boolean = false;
  responseProducto: ResponseProducto[] = [];
  responseOrden : ResponseListOrden[] = []
  responseUnidad: ResponseUnidad[] = [];
  fechaActual: Date = new Date();
  responseVwCliente: ResponseVWCliente[] = [];
  envioOrder: RequestVWOrden = new RequestVWOrden();
  responseVWOrden: ResponseListOrden = new ResponseListOrden();

  constructor(
    private fb: FormBuilder,
    private _clienteService: ClienteService,
    private _ordenService: OrdenService,
    private datetTipe:DatePipe,
    private _productoService: ProductoService,
    private _unidadService: UnidadService
  ) {
    const dataNow = new Date();
    const idUsuario = parseInt(sessionStorage.getItem('idUsuario') || '0', 10);
    this.myForm = this.fb.group({
      idOrden: [{ value: 0, disabled: true }, [Validators.required]],
      nombreProd: [null, Validators.required],
      fechaOrden: [{ value: dataNow }, Validators.required],
      fechaRequerido: [null, Validators.required],
      codigoOrden: [null, Validators.required],
      estadoOrden: ['Activo', Validators.required],
      stock:[{ value: null, disabled: true }, Validators.required],
      nombreCliente: [null, Validators.required],
      precioUnitario: [{ value: null, disabled: true }, Validators.required],
      montoTotal: [{ value: null, disabled: true }, Validators.required],
      cantidad: [null, Validators.required],
      nombreUnidad: [null, Validators.required],
      idUsuario: [idUsuario , [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.myForm.patchValue(this.orden);
    this.listarClientes();
    this.listarProductos();
    this.listarUnidad();

    // Actualizar precio y monto total al cambiar producto y cantidad
    this.myForm.get('nombreProd')?.valueChanges.subscribe(value => {
      this.actualizarPrecio(value);
    });

    this.myForm.get('cantidad')?.valueChanges.subscribe(() => {
      this.actualizarMontoTotal();
    });

    this.myForm.get('nombreUnidad')?.valueChanges.subscribe(() => {
      this.actualizarMontoTotal();
    });
    this.myForm.get('nombreProd')?.valueChanges.subscribe(value => {
      this.actualizarStock(value);
    });
  }
  estCantidad(): boolean {
    
    const cantidadFaltante = this.myForm.get('stock')?.value;
    return cantidadFaltante === 0;
  }
  listarProductos() {
    this._productoService.getAll().subscribe({
      next: (data: ResponseProducto[]) => {
        this.responseProducto = data;
      },
      error: () => {
        alert_error("Ocurrió un error al cargar los productos.");
      }
    });
  }
 
  listarUnidad() {
    this._unidadService.getAll().subscribe({
      next: (data: ResponseUnidad[]) => { this.responseUnidad = data; }
    });
  }

  listarClientes() {
    this._clienteService.getAll().subscribe({
      next: (data: ResponseVWCliente[]) => {
        this.responseVwCliente = data;
      },
      error: () => {
        alert_error("Ocurrió un error al cargar los clientes.");
      }
    });
  }

  actualizarPrecio(nombreProduc: string | null) {
    const producto = this.responseProducto.find(p => p.nombreProd === nombreProduc);
    if (producto) {
      this.myForm.get('precioUnitario')?.setValue(producto.precioUnitario, { emitEvent: false });
    }
    this.actualizarMontoTotal();
  }
  actualizarStock(nombreProd: string | null) {
    const producto = this.responseProducto.find(p => p.nombreProd === nombreProd);
    if (producto) {
      this.myForm.get('stock')?.setValue(producto.stock, { emitEvent: false });
    }

  }

  actualizarMontoTotal() {
    const cantidad = this.myForm.get('cantidad')?.value || 0;
    const precioUnitario = this.myForm.get('precioUnitario')?.value || 0;
    const unidad = this.myForm.get('nombreUnidad')?.value;
    let montoTotal = cantidad * precioUnitario;

    if (unidad === 'Docenas') {
      montoTotal *= 12; // Multiplicar por 12 si la unidad es "Docena"
    }

    this.myForm.get('montoTotal')?.setValue(montoTotal, { emitEvent: false });
  }

 crearOrden()
 {
  this._ordenService.create(this.envioOrder).subscribe(
    {
      next:()=>{ alert_sucess("Se creo correctamente el orde") },
      error:()=>{ alert_error("No se pudo crear el Orden")},
      complete:()=>{ this.cerrarModal(true)}
    }
  )
 }
  guardar()
  {
    debugger
   
      this.envioOrder = this.myForm.getRawValue()
      switch(this.accion)
      {
        case AcciontConstants.crear: 
          this.crearOrden()
          break;
        case AcciontConstants.editar: 
        this.actualizarOrde()
          break;
        case AcciontConstants.eliminar: 
          break;
        
      
      
        
      }
      console.log(this.myForm.getRawValue())
    }
   actualizarOrde()
   {
    this._ordenService.update(this.envioOrder).subscribe(
      {
        next:()=>{alert_sucess("Se actualizo")},
        error:()=>{},
        complete:()=>{}
      }
    )
   }
    cerrarModal(res:boolean)
    {
      this.closeModalEmmit.emit(res)
      //true Hubo modificacion en la base de datos
      
  
      //false => No hubo modificacion de la base de datos
    }
    agregarMasProducto() {
    // Lógica para agregar más productos
    }
    formattedFechaOrden(fecha: string | null): string {
      return this.datetTipe.transform(fecha ?? '', 'yyyy-MM-dd') || '';
    }
    
    formattedFechaRequerido(fecha: string | null): string {
      return this.datetTipe.transform(fecha ?? '' , 'yyyy-MM-dd')||'';
    }
  
}
