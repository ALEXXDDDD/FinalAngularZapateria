import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseOrden } from '../../../models/orden/orden-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { OrdenService } from '../../../service/orden/orden.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { RequestUnidad } from '../../../models/unidad/p/unidad-request.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';
import { CreditoService } from '../../../service/credito/credito.service';
import { VistCredito } from '../../../models/credito/credito-responseVist.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

enum EstadoOrden {
  Todas = "todas",
  A_Tiempo = "a-tiempo",
  Retrasadas = "retrasadas"
}

@Component({
  selector: 'app-mant-list-orden',
  templateUrl: './mant-list-orden.component.html',
  styleUrls: ['./mant-list-orden.component.css']
})
export class MantListOrdenComponent implements OnInit {
  responseOrden: ResponseOrden[] = [];
  mostrarInforme: boolean = false;
  response: ResponseOrden = new ResponseOrden();
  OrdenSelect: ResponseListOrden = new ResponseListOrden();
  orden: ResponseListOrden[] = [];
  responseVistCredito: VistCredito[] = [];
  UnidadSelect: RequestUnidad = new RequestUnidad();
  responseVWOrden: ResponseListOrden = new ResponseListOrden();
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  modalRef?: BsModalRef;
  titleModal: string = "";
  fechaActual: Date = new Date();
  myFormFilter: FormGroup;
  mostrarListaCompleta: boolean = true;
  accionModal: number = 0;
  tablaActual: string = 'conAccion';
  orderColumns: string[] = Object.keys(new ResponseListOrden());

  constructor(
    private _router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private datetTipe:DatePipe,
    private _creditoService: CreditoService,
    private _OrdenService: OrdenService
  ) {
    this.myFormFilter = this.fb.group({
      nombreRol: [""]
    });
  }

  ngOnInit(): void {
    this.listarOrden();
    this.listarCredito();
  }

  listarCredito() {
    this._creditoService.getAllCredito().subscribe({
      next: (data: VistCredito[]) => {
        this.responseVistCredito = data;
        console.log("Creditos ", data);
      },
      error: () => { },
      complete: () => { }
    });
  }
  verInforme(orden:ResponseListOrden) {
    debugger
    this.responseVWOrden= orden
    console.log(this.responseVWOrden)
    this.mostrarInforme = true;
  }
   // Método para mostrar el informe
   ocultarInforme() {
    this.mostrarInforme = false;
  }
  filtrarOrdenAcIna(nombre:string)
  {
    this.nombreRol.nombre = nombre;
    this._OrdenService.genericFiltroOrdenActivo(this.nombreRol).subscribe({
      next: (data: ResponseListOrden[]) => {
        this.orden = data; // Actualiza la lista con la respuesta filtrada
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => { }
    });
  }
  listarOrden() {
    this._OrdenService.getAll().subscribe({
      next: (data: ResponseOrden[]) => {
        this.responseOrden = data;
        console.log(data);
      },
      error: () => { },
      complete: () => { }
    });
  }
  descargarPDF() {
    debugger
    const informeVenta = document.getElementById("informe");

    if (informeVenta) {
      html2canvas(informeVenta).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; // Ajustar al ancho de la página
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Añadir la primera imagen al PDF
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Si el contenido excede la altura de la página, añadir páginas adicionales
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('informe-ventas.pdf');
      });
    }
  }
  filtroOrdenRetrasados() {
    const valorForm = this.myFormFilter.getRawValue();

    if (valorForm.nombreRol.trim() === '' || valorForm.nombreRol.trim() === 'Todos') {
      this.mostrarListaCompleta = true;
      this.listarOrden(); // Carga la lista completa si no hay filtro
      return;
    }

    this.mostrarListaCompleta = false;
    this.nombreRol.nombre = valorForm.nombreRol;

    this._OrdenService.genericFiltrol(this.nombreRol).subscribe({
      next: (data: ResponseListOrden[]) => {
        this.orden = data; // Actualiza la lista con la respuesta filtrada
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => { }
    });
  }

  formattedFechaOrden(fecha: string | null): string {
    return this.datePipe.transform(fecha ?? '', 'yyyy-MM-dd') || '';
  }

  formattedFechaRequerido(fecha: string | null): string {
    return this.datePipe.transform(fecha ?? '', 'yyyy-MM-dd') || '';
  }

  formatSol(valor: number | null | undefined): string {
    return valor === null || valor === undefined ? '' : `S/. ${valor.toFixed(2)}`;
  }

  getCleanOrden(orden: ResponseListOrden): Record<string, any> {
    const cleaned: Record<string, any> = {};
    Object.entries(orden).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (key === 'precioUnitario' || key === 'montoTotal') {
          cleaned[key] = `S/. ${Number(value).toFixed(2)}`;
        } else {
          cleaned[key] = value;
        }
      }
    });
    return cleaned;
  }

  getNonNullOrderFields(orden: ResponseListOrden): Record<string, any> {
    return Object.entries(orden).reduce((acum, [clave, valor]) => {
      if (valor !== null && valor !== undefined && valor !== '') {
        acum[clave] = valor;
      }
      return acum;
    }, {} as Record<string, any>);
  }

  getDisplayedOrders(): ResponseListOrden[] {
    if (this.mostrarListaCompleta) {
      return this.responseOrden.flatMap(grupo => grupo.ordens ?? []);
    }

    return this.orden;
  }

  getVisibleOrderColumns(): string[] {
    const orders = this.getDisplayedOrders();

    if (!orders.length) {
      return [];
    }

    return Object.keys(new ResponseListOrden()).filter((column) =>
      orders.some((order) => this.hasDisplayValue(this.getOrderValue(order, column)))
    );
  }

  getOrderValue(orden: ResponseListOrden, column: string): unknown {
    return (orden as unknown as Record<string, unknown>)[column];
  }

  hasDisplayValue(value: unknown): boolean {
    if (value === null || value === undefined || value === '') {
      return false;
    }

    if (typeof value === 'number') {
      return value !== 0;
    }

    return true;
  }

  formatBackendValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }

    if (typeof value === 'number') {
      return value.toLocaleString('es-PE');
    }

    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }

    if (typeof value === 'string' && value.includes('T')) {
      const parsedDate = new Date(value);
      if (!Number.isNaN(parsedDate.getTime())) {
        return this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || value;
      }
    }

    return String(value);
  }

  formatColumnName(column: string): string {
    return column
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (char) => char.toUpperCase());
  }

  mostrarTabla(tabla: string) {
    this.tablaActual = tabla;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  crearOrden(template: TemplateRef<any>) {
    this.titleModal = "Nuevo Orden";
    this.OrdenSelect = new ResponseListOrden();
    this.accionModal = AcciontConstants.crear;
    this.openModal(template);
  }

  editarOrden(template: TemplateRef<any>, Orden: ResponseListOrden) {
    this.titleModal = "Actualizar Orden";
    this.OrdenSelect = Orden;
    this.accionModal = AcciontConstants.editar;
    this.openModal(template);
  }

  crearUnidad(templateUnidad: TemplateRef<any>) {
    this.titleModal = "Crear Unidad";
    this.UnidadSelect = new RequestUnidad();
    this.accionModal = AcciontConstants.crear;
    this.openModal(templateUnidad);
  }

  eliminarOrden(id: number) {
    if (confirm("¿Estás seguro de eliminar?")) {
      this._OrdenService.delete(id).subscribe({
        next: () => {
          alert("Se eliminó correctamente");
          this.listarOrden(); // Refrescar la lista después de eliminar
        },
        error: () => { },
        complete: () => { }
      });
    }
  }

  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarOrden();
    }
  }
}
