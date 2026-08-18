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
import { DetalleProductoService } from '../../../service/detalleProducto/detalle-producto.service';
import { ResponseDetalleProcedureProducto } from '../../../models/producto/productoResponseDetalle.model';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { forkJoin } from 'rxjs';
import { StorageService, UploadResponse } from '../../../service/storage/storage.service';

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
  productoExpandidoId: number | null = null;
  detalleProducto: ResponseDetalleProcedureProducto | null = null;
  cargandoDetalleProducto = false;
  mostrandoFormularioDetalle = false;
  actualizandoDetalle = false;
  mensajeActualizacionDetalle = '';
  formularioDetalle: FormGroup;
  archivosDetalle: { fotografia2?: File; fotografia3?: File; fotografia4?: File } = {};
  // Compatibilidad temporal con la carga anterior; el nuevo formulario no usa este servicio.
  subiendoImagenesDetalle = false;
  mensajeCargaImagenes = '';
  readonly maximoImagenesDetalle = 3;
  readonly tamanoMaximoImagen = 6 * 1024 * 1024;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _productoService: ProductoService,
    private _storeProducto: VistProducAcabadoService,
    private _modeloService: ModeloService,
    private _detalleProductoService: DetalleProductoService,
    private _storageService: StorageService
  ) {
    // Definición del formulario de filtro
    this.myFormFilter = this.fb.group({
      nombreProd: [""],
      nombreRol: [""],
      codigoProd: [""]
    });
    this.formularioDetalle = this.fb.group({
      nombreProducto: [{ value: '', disabled: true }],
      color: [''],
      categoria: [''],
      talla: [''],
      material: [''],
      descripcion: ['']
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

  toggleDetalleProducto(idProducto: number): void {
    if (this.productoExpandidoId === idProducto) {
      this.productoExpandidoId = null;
      this.detalleProducto = null;
      this.cerrarFormularioDetalle();
      return;
    }

    this.productoExpandidoId = idProducto;
    this.detalleProducto = null;
    this.cargandoDetalleProducto = true;
    this.cerrarFormularioDetalle();

    this._detalleProductoService.getByProductoId(idProducto).subscribe({
      next: (data: ResponseDetalleProcedureProducto) => {
        if (this.productoExpandidoId === idProducto) {
          this.detalleProducto = Array.isArray(data) ? data[0] || null : data;
        }
      },
      error: () => {
        if (this.productoExpandidoId === idProducto) {
          this.detalleProducto = null;
          alert_error('No se pudo cargar el detalle del producto');
        }
      },
      complete: () => {
        if (this.productoExpandidoId === idProducto) {
          this.cargandoDetalleProducto = false;
        }
      }
    });
  }

  getImagenDetalleUrl(fotografia: string | null | undefined): string {
    const imagen = fotografia?.trim();
    if (!imagen) {
      return this.fallbackImage;
    }

    return imagen.startsWith('http://') || imagen.startsWith('https://')
      ? imagen
      : this.getImagenUrl(imagen);
  }

  tieneImagenesDetalle(): boolean {
    return !!this.detalleProducto && [
      this.detalleProducto.fotografia2,
      this.detalleProducto.fotografia3,
      this.detalleProducto.fotografia4
    ].some(imagen => !!imagen?.trim());
  }

  cargarImagenesDetalle(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivos = Array.from(input.files || []);
    input.value = '';
    this.mensajeCargaImagenes = '';

    if (!archivos.length) {
      return;
    }

    if (archivos.length > this.maximoImagenesDetalle) {
      this.mensajeCargaImagenes = `Selecciona como máximo ${this.maximoImagenesDetalle} imágenes.`;
      return;
    }

    const archivoInvalido = archivos.find(archivo =>
      !archivo.type.startsWith('image/') || archivo.size > this.tamanoMaximoImagen
    );
    if (archivoInvalido) {
      this.mensajeCargaImagenes = 'Cada archivo debe ser una imagen y no superar los 6 MB.';
      return;
    }

    this.subiendoImagenesDetalle = true;
    forkJoin(archivos.map(archivo => this._storageService.uploadImage(archivo))).subscribe({
      next: (respuestas: UploadResponse[]) => {
        const urls = respuestas.filter(respuesta => respuesta.success && !!respuesta.url).map(respuesta => respuesta.url);
        if (urls.length !== archivos.length || !this.detalleProducto) {
          this.mensajeCargaImagenes = 'No fue posible subir todas las imágenes.';
          return;
        }

        this.detalleProducto.fotografia2 = urls[0] || '';
        this.detalleProducto.fotografia3 = urls[1] || '';
        this.detalleProducto.fotografia4 = urls[2] || '';
        this.mensajeCargaImagenes = `${urls.length} imagen(es) subida(s) correctamente.`;
      },
      error: () => {
        this.mensajeCargaImagenes = 'No fue posible subir las imágenes. Inténtalo nuevamente.';
        this.subiendoImagenesDetalle = false;
      },
      complete: () => {
        this.subiendoImagenesDetalle = false;
      }
    });
  }
  abrirFormularioDetalle(nombreProducto: string): void {
    if (!this.detalleProducto) return;
    this.mostrandoFormularioDetalle = true;
    this.mensajeActualizacionDetalle = '';
    this.archivosDetalle = {};
    this.formularioDetalle.reset({
      nombreProducto,
      color: this.detalleProducto.color || '',
      categoria: this.detalleProducto.categoria || '',
      talla: this.detalleProducto.talla || '',
      material: this.detalleProducto.material || '',
      descripcion: this.detalleProducto.descripcion || ''
    });
  }

  cerrarFormularioDetalle(): void {
    this.mostrandoFormularioDetalle = false;
    this.mensajeActualizacionDetalle = '';
    this.archivosDetalle = {};
  }

  seleccionarImagenDetalle(event: Event, campo: 'fotografia2' | 'fotografia3' | 'fotografia4'): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) return;
    if (!archivo.type.startsWith('image/') || archivo.size > this.tamanoMaximoImagen) {
      this.mensajeActualizacionDetalle = 'Cada archivo debe ser una imagen y no superar los 6 MB.';
      input.value = '';
      return;
    }
    this.archivosDetalle[campo] = archivo;
    this.mensajeActualizacionDetalle = `${archivo.name} listo para actualizar.`;
  }

  actualizarDetalle(): void {
    const valores = this.formularioDetalle.getRawValue();
    const nombreProducto = valores.nombreProducto?.trim();
    if (!nombreProducto) {
      alert_error('No se encontró el nombre del producto');
      return;
    }
    const formData = new FormData();
    formData.append('NombreProducto', nombreProducto);
    (['color', 'categoria', 'talla', 'material', 'descripcion'] as const).forEach(campo => {
      const valor = valores[campo]?.trim();
      if (valor) formData.append(campo.charAt(0).toUpperCase() + campo.slice(1), valor);
    });
    if (this.archivosDetalle.fotografia2) formData.append('Fotografia2', this.archivosDetalle.fotografia2);
    if (this.archivosDetalle.fotografia3) formData.append('Fotografia3', this.archivosDetalle.fotografia3);
    if (this.archivosDetalle.fotografia4) formData.append('Fotografia4', this.archivosDetalle.fotografia4);

    this.actualizandoDetalle = true;
    this._detalleProductoService.actualizarftpDetalle(formData).subscribe({
      next: () => {
        alert_sucess('Detalle actualizado correctamente');
        const productoId = this.productoExpandidoId;
        this.cerrarFormularioDetalle();
        if (productoId !== null) {
          this.productoExpandidoId = null;
          this.toggleDetalleProducto(productoId);
        }
      },
      error: () => alert_error('No se pudo actualizar el detalle del producto'),
      complete: () => this.actualizandoDetalle = false
    });
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
