import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseVWProduccion } from '../../../models/Produccion/produccion-reponseVW.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestVWProduccion } from '../../../models/Produccion/produccion-requestVW.model';
import { ProduccionService } from '../../../service/produccion/produccion.service';
import { DetalleProduccionService } from '../../../service/detalleProduccion/detalle-produccion.service';
import { ResponseDetalleProduccion } from '../../../models/DetalleProduccion/DetalleProduccion-response.model';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseProduccion } from '../../../models/Produccion/produccion-response.model';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { ResponseVProduccion } from '../../../models/Produccion/responseProduccion.model';

@Component({
  selector: 'app-mant-produccion-list',
  templateUrl: './mant-produccion-list.component.html',
  styleUrls: ['./mant-produccion-list.component.css']
})
export class MantProduccionListComponent implements OnInit{

  Produccion : ResponseProduccion []=[]
  responseProducto : ResponseProducto []=[]
  responseVProduccion:ResponseVProduccion[]=[]
  responseProduccion:ResponseVWProduccion[]=[]
  modalRef?:BsModalRef
  title:string=""
  accionModal:number=0
  selectProduccion : ResponseProduccion = new ResponseProduccion()
  envioProduccion : RequestVWProduccion  = new RequestVWProduccion()

  constructor 
  (
    private _ProduccionService : ProduccionService,
    private _productoService : ProductoService,
    private _detalleProduccionService : DetalleProduccionService,
    private _modalService : BsModalService
  )
  {

  }
  tablaActual: string = 'sinAccion';
  produccionExpandidaId: number | null = null;
  mostrarDetalleProducciones = false;
  detalleProduccionId: number | null = null;
  detalleProduccion: ResponseDetalleProduccion[] = [];
  cargandoDetalleProduccion = false;

  mostrarTabla(tabla: string) {
    this.tablaActual = tabla;
    this.produccionExpandidaId = null;
    this.mostrarDetalleProducciones = false;
    this.detalleProduccionId = null;
  }

  toggleOpcionesProduccion(idProduccion: number, codigoProduccion?: string) {
    const esMismaFila = this.produccionExpandidaId === idProduccion;
    if (esMismaFila) {
      this.cerrarDetalleProducciones();
      return;
    }

    this.produccionExpandidaId = idProduccion;
    this.detalleProduccionId = idProduccion;
    this.mostrarDetalleProducciones = true;
    this.detalleProduccion = [];

    if (codigoProduccion) {
      this.cargarDetalleProduccion(codigoProduccion);
    }
  }

  mostrarProduccionesDetalle(idProduccion: number, codigoProduccion: string) {
    this.toggleOpcionesProduccion(idProduccion, codigoProduccion);
  }

  private cargarDetalleProduccion(codigoProduccion: string) {
    this.cargandoDetalleProduccion = true;
    this._detalleProduccionService.getByCodigoProduccion(codigoProduccion).subscribe({
      next: (data: ResponseDetalleProduccion[]) => {
        this.detalleProduccion = data;
      },
      error: () => {
        alert_error('No se pudo cargar el detalle de producción');
        this.detalleProduccion = [];
      },
      complete: () => {
        this.cargandoDetalleProduccion = false;
      }
    });
  }

  getCantidadIngreso(item: any): string {
    return item?.cantidadIngreso ?? item?.cantidad ?? item?.cantidadProduccion ?? '-';
  }

  getFechaIngreso(item: any): string {
    return item?.fechaIngreso ?? item?.fechaRegistro ?? item?.fechaInicio ?? '-';
  }

  getEmpleado(item: any): string {
    return item?.empleado?.nombre
      ?? item?.nombreEmpleado
      ?? item?.empleadoNombre
      ?? item?.empleado
      ?? item?.responsable
      ?? 'Sin empleado';
  }

  cerrarDetalleProducciones() {
    this.mostrarDetalleProducciones = false;
    this.detalleProduccionId = null;
    this.produccionExpandidaId = null;
  }
  ngOnInit(): void {
    this.listarProduccion()
    this.listarProduccionSinAcciones()
  }
  listarProduccion ()
  {
    this._ProduccionService.getAll().subscribe
    (
      {
        next:(data:ResponseProduccion[])=>
          {
            this.Produccion=data
          },
        error:(error)=>{
          alert_error("No se pudo cargar la data ")
        },
        complete:()=>{}
      }
    )
  }
  listarProduccionSinAcciones()
  {
    this._ProduccionService.GetProduccion().subscribe
    (
      {
        next:(data:ResponseVProduccion[])=>{this.responseVProduccion=data},
        error:()=>{},
        complete:()=>{}
      }
    )
  }
  crearProduccion(template:TemplateRef<any>)
  {
    this.title = "Registrar Nueva Produccion"
    this.envioProduccion  = new RequestVWProduccion()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)

  }
  editarProduccion(template:TemplateRef<any>,Produccion:RequestVWProduccion)
  {
    this.title=" Salida"
    this.envioProduccion = Produccion
    this.accionModal = AcciontConstants.editar
    this.openModal(template)

  }
  resgitrarProduccion(template:TemplateRef<any>, itemProduccion?:any)
  {
    this.title=" Ingreso Producto"
    this.accionModal = AcciontConstants.editar
    if(itemProduccion)
    {
      this.envioProduccion = itemProduccion;
    }
    this.accionModal = AcciontConstants.editar;
    this.openModal(template)
  }
  openModal( template : TemplateRef<any>)
  {
    this.modalRef = this._modalService.show(template,Object.assign({},{class:"gray modal-lg"}))
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
  getCloseModal(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
      {
        this.listarProduccion()
      }
  }
}