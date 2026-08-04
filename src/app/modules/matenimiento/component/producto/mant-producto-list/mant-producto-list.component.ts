import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ProductoService } from '../../../service/producto/producto.service';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { ResponseModelo } from '../../../models/modelo/modelo-response.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { RequestFilterGeneric } from '../../../models/genericFilterRequest.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ResponseFilterGeneric } from '../../../models/genericFilterResponse.models';
import { VistProducAcabadoService } from '../../../service/producto/vist-produc-acabado.service';
import { ResponseProcedureProducto } from '../../../models/producto/producto-responseProcedure.model';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';
import { Producto } from '../../../service/producto/producto-response.model';

@Component({
  selector: 'app-mant-producto-list',
  templateUrl: './mant-producto-list.component.html',
  styleUrls: ['./mant-producto-list.component.css']
})
export class MantProductoListComponent implements OnInit {
  responseProducto: ResponseProducto[] = [];
  responseModelo: ResponseModelo[] = [];
  responseStoreProducto: ResponseProcedureProducto[] = [];
  productoEnviar: ResponseProducto = new ResponseProducto();
  modalRef?: BsModalRef;
  titleModal: string = "";
  accionModal: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 1;
  request: RequestFilterGeneric = new RequestFilterGeneric();
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  mostrarListaCompleta: boolean = true;
  producto : Producto []=[]
  myFormFilter: FormGroup;
  tablaActual: string = 'conAccion';
  readonly fallbackImage = '/assets/img/img_Template/1.png';

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _productoService: ProductoService,
    private _storeProducto: VistProducAcabadoService,
    private _modeloService: ModeloService
  ) {
    // Definición del formulario de filtro
    this.myFormFilter = this.fb.group({
      nombreProd: [""],
      nombreRol: [""],
      codigoProd: [""]
    });
  }

  ngOnInit(): void {
    this.filtrar();
    this.listarProductos();
    this.filtroProductosAcabados();
  }

  // Alterna entre tablas de productos con acción o sin acción
  mostrarTabla(tabla: string) {
    this.tablaActual = tabla;
  }
 
  // Agrega esta función para procesar la imagen de forma segura
  getImagenUrl(fotografia: any): string {

  if (!fotografia) {
    return this.fallbackImage;
  }

  let base64 = fotografia.toString().trim();

  // Si ya viene lista
  if (base64.startsWith('data:image')) {
    return base64;
  }

  // Tu API devuelve /9j...
  if (base64.startsWith('/9j/')) {
    base64 = base64.substring(1);
  }

  // Detectar JPEG
  if (base64.startsWith('9j/')) {
    return `data:image/jpeg;base64,${base64}`;
  }

  // Detectar PNG
  if (base64.startsWith('iVBOR')) {
    return `data:image/png;base64,${base64}`;
  }

  return this.fallbackImage;
}

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = this.fallbackImage;
    }
  }
  listarProductosAcabados() {
    this._storeProducto.getAll().subscribe({
      next: (data: ResponseProcedureProducto[]) => {
        this.responseStoreProducto = data;
        console.log("Productos Acabados", data);
      },
      error: () => {},
      complete: () => {}
    });
  }

  filtroProductosAcabados() {
    this._productoService.filtroProductoAcabado().subscribe({
      next: (data: Producto[]) => {
        this.producto = data;
        console.log("Productos acabados", data);
      },
      error: (error: any) => {},
      complete: () => {}
    });
  }

  listarProductos() {
     this._productoService.getAll().subscribe({
    next: (data) => {

      this.responseProducto = data;

      console.log("Longitud:", data[0].fotografia.length);
      console.log(data[0].fotografia.substring(0, 20));
      console.log(data[0].fotografia.substring(data[0].fotografia.length - 20));

    }
    });
  }

  listarModelo() {
    this._modeloService.getAll().subscribe({
      next: (datos: ResponseModelo[]) => {
        this.responseModelo = datos;
      },
      error: () => {
        alert("Ocurrió un error");
      },
      complete: () => {}
    });
  }

  crearProducto(template: TemplateRef<any>) {
    this.titleModal = "Nuevo Producto";
    this.accionModal = AcciontConstants.crear;
    this.productoEnviar = new ResponseProducto();
    this.openModal(template);
  }

  editarProducto(template: TemplateRef<any>, producto: ResponseProducto) {
    this.titleModal = "Editar Producto";
    this.productoEnviar = producto;
    this.accionModal = AcciontConstants.editar;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCloseModalEmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.listarProductos();
      this.filtroProductosAcabados();
    }
  }

  listarFiltro() {
    const valorForm = this.myFormFilter.getRawValue();

    if (valorForm.nombreRol.trim() === '') {
      this.mostrarListaCompleta = true;
      this.filtrar(); // Recarga la lista completa si no hay filtro
      return;
    }

    this.mostrarListaCompleta = false;
    this.nombreRol.nombre = valorForm.nombreRol;

    this._productoService.genericFiltrol(this.nombreRol).subscribe({
      next: (data: ResponseProducto[]) => {
        this.responseProducto = data; // Actualiza la lista con la respuesta filtrada
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al filtrar productos', error);
      },
      complete: () => {}
    });
  }

  filtrar() {
    const valorForm = this.myFormFilter.getRawValue();
    this.request.filtros = [
      { name: "nombreProd", value: valorForm.nombreProd },
      { name: "codigoProd", value: valorForm.codigoProd }
    ];

    this._productoService.genericFilter(this.request).subscribe({
      next: (data: ResponseFilterGeneric<ResponseProducto>) => {
        this.responseProducto = data.lista;
        this.totalItems = data.totalRegistros;
      },
      error: () => {
        console.log("ERROR al filtrar");
      },
      complete: () => {
        console.log("Filtro completado");
      }
    });
  }

  changePage(event: PageChangedEvent) {
    this.request.numeroPagina = event.page;
    this.filtrar();
  }

  changeItemsPerPage() {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }
}
