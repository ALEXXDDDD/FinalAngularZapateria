import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { ProductFilterService } from 'src/app/services/product-filter/product-filter.service';
import { MessageService } from 'primeng/api';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { RequestFilterGeneric } from 'src/app/modules/matenimiento/models/genericFilterRequest.model';
import { ResponseFilterGeneric } from 'src/app/modules/matenimiento/models/genericFilterResponse.models';
import { ResponseModelo } from 'src/app/modules/matenimiento/models/modelo/modelo-response.model';
import { RequestProducto } from 'src/app/modules/matenimiento/models/producto/producto-request.model';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import { ResponseVDetalleProducto } from 'src/app/modules/matenimiento/models/producto/producto-responseVDetalle.model';
import { ModeloService } from 'src/app/modules/matenimiento/service/modelo/modelo.service';
import { ProductoService } from 'src/app/modules/matenimiento/service/producto/producto.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { LoadStateEnum } from 'src/app/modules/matenimiento/models/core/utils/load-enum';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-welcome-body',
  templateUrl: './welcome-body.component.html',
  styleUrls: ['./welcome-body.component.css']
})
export class WelcomeBodyComponent implements OnInit, OnDestroy {
  cities: City[] | undefined;
  formGroup: FormGroup | undefined;
  modalRef?: BsModalRef;
  titleModal : string = ""
  accionModal : number = 0
  detalleSelect:ResponseVDetalleProducto = new ResponseVDetalleProducto()
  productoSelect : ResponseProducto = new ResponseProducto()
  responseProducto : ResponseProducto []=[]
  allProducts: ResponseProducto[] = []
  selectedCategory: string = 'Todos'
  responseModelo : ResponseModelo[]=[]
  categorySubscription?: Subscription;
  requestProducto :RequestProducto= new RequestProducto();
  
  ProductoSelect : RequestProducto = new RequestProducto()
  responseDetalle : ResponseVDetalleProducto[]=[]
  idProduc=this.requestProducto.idProducto
  totalItems:number =0
  itemsPerPage:number=1
  request : RequestFilterGeneric = new RequestFilterGeneric()
  myFormFilter:FormGroup
  frmLoadSt = LoadStateEnum.None;
  loadStateEnum = LoadStateEnum;
  constructor (
    private _router:Router, 
    private fb:FormBuilder,
    private _carritoService:CarritoService,
    private modalService: BsModalService,
    private _productoService : ProductoService,
    private messageService: MessageService,
    private _modeloService : ModeloService,
    private productFilterService: ProductFilterService,

    

  )
  {
    this.myFormFilter = this.fb.group(
      {
        idProducto:[],
        nombreProd: [""],
        codigoProd: [""]
      }
    )
  }
 
  ngOnInit(): void {
    this.frmLoadSt = LoadStateEnum.Loading;
    this.categorySubscription = this.productFilterService.category$.subscribe(category => {
      this.selectedCategory = category;
      this.applyCategoryFilter();
    });
    this.loadProducts();
    
    //  this.listarProductos()
    // this.filtrar()
     this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null)
  });
    // this.listarModelos()
  }
  getImagenUrl(fotografia: any): string {
    const fallbackImage = 'assets/img/img_Template/1.png';

    if (!fotografia || fotografia === 'null' || fotografia === 'undefined') {
      return fallbackImage;
    }

    if (typeof fotografia === 'string') {
      let valor = fotografia.trim().replace(/^['"]|['"]$/g, '');
      if (!valor) {
        return fallbackImage;
      }

      const cleaned = valor.replace(/\s+/g, '');
      const isBase64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(cleaned);
      const rawBase64Pattern = /^(?:\/?)(?:9j\/|9J\/|iVBOR|R0lGOD)/;

      if (valor.startsWith('data:image')) {
        return valor;
      }

      if (/^https?:\/\//i.test(valor)) {
        return valor;
      }

      if (valor.includes('base64,')) {
        return valor;
      }

      if (/System\.Byte\[\]|Byte\[\]|System\.String/i.test(valor)) {
        return fallbackImage;
      }

      if (rawBase64Pattern.test(valor)) {
        // /9j/ es un inicio válido de una imagen JPEG en Base64, no una ruta.
        const payload = cleaned;
        const mime = /^(?:\/?)(?:iVBOR|R0lGOD)/.test(valor) ? 'image/png' : 'image/jpeg';
        return `data:${mime};base64,${payload}`;
      }

      if (valor.startsWith('/assets') || valor.startsWith('assets/') || valor.startsWith('/img') || valor.startsWith('img/')) {
        return valor;
      }

      if (isBase64 && cleaned.length > 20) {
        const mime = cleaned.startsWith('iVBOR') || cleaned.startsWith('R0lGOD') ? 'image/png' : 'image/jpeg';
        return `data:${mime};base64,${cleaned}`;
      }

      return fallbackImage;
    }

    if (Array.isArray(fotografia)) {
      const base64String = btoa(
        new Uint8Array(fotografia).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return `data:image/png;base64,${base64String}`;
    }

    return fallbackImage;
  }
  addProducto(prod:ResponseProducto)
  {
    if (!this.tieneStock(prod)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Sin stock',
        detail: `${prod.nombreProd} no tiene stock disponible.`
      });
      return;
    }

    this.messageService.add({ 
      severity: 'success', 
      summary: 'Producto Agregado', 
      detail: `${prod.nombreProd} ha sido agregado al carrito.` 
    });
    this._carritoService.addProducto(prod)
    this._carritoService.sumarPrecios()
  }
  monstrarDetalle(template:TemplateRef<any>,producto:ResponseProducto,id:number)
  {
    if (!this.tieneStock(producto)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Sin stock',
        detail: `${producto.nombreProd} no tiene stock disponible.`
      });
      return;
    }

    this.titleModal ="Detalle"
    this.productoSelect = producto
    this.accionModal = AcciontConstants.detalle
    this.openModal(template);

  }

  tieneStock(producto: ResponseProducto): boolean {
    return (producto?.stock ?? 0) > 0;
  }
  // monstrarDetalleProducto(id:number)
  // {
  //   debugger;
  //   this._productoService.getById(id).subscribe(
  //     {
  //       next:(data:ResponseVDetalleProducto[])=>{
  //         this.responseDetalle=data
  //         console.log(data)
  //       }
  //     }
  //   )
  // }
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

  loadProducts() {
    this._productoService.getAll().subscribe({
      next: (data) => {
        this.allProducts = data;
        if (!this.selectedCategory) {
          this.selectedCategory = 'Todos';
        }
        this.applyCategoryFilter();
        this.totalItems = this.responseProducto.length;
        this.frmLoadSt = LoadStateEnum.Success;
      },
      error: (error) => {
        console.error('Error cargando productos', error);
        this.frmLoadSt = LoadStateEnum.Error;
      }
    });
  }

  applyCategoryFilter() {
    const category = this.selectedCategory?.trim().toLowerCase() ?? '';
    if (!category || category === 'todos') {
      this.responseProducto = [...this.allProducts];
    } else {
      const searchKey = category === 'botines' ? 'botin' : category;
      this.responseProducto = this.allProducts.filter(prod =>
        prod.nombreProd?.toLowerCase().includes(searchKey)
      );
    }
    this.totalItems = this.responseProducto.length;
  }

  setCategory(category: string) {
    this.productFilterService.selectCategory(category);
  }

  verProductos(): void {
    this.setCategory('Todos');
    setTimeout(() => document.getElementById('catalogo-productos')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    }));
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered product-detail-modal',
      ignoreBackdropClick: false
    });
  }

  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this.filtrar()
    }
  }
 
  filtrar()
  {
    
    let valuedorm = this.myFormFilter.getRawValue()
    this.request.filtros = []
  
    this.request.filtros.push({name:"nombreProducto",value: valuedorm.nombreProducto} );
    this.request.filtros.push({name:"descripProducto",value: valuedorm.descripProducto} );
    
    this._productoService.genericFilter(this.request).subscribe
    (
      {
        next:(data:ResponseFilterGeneric<ResponseProducto>)=>{
          console.log(data)
          this.responseProducto  = data.lista;
          this.totalItems = data.totalRegistros;
          this.frmLoadSt = LoadStateEnum.Success;
        },
        error:(error)=>{
          console.log(error);
          this.frmLoadSt = LoadStateEnum.Error;
        },
        complete:(
  
        )=>{
          console.log("Compelete")
        }
      }
    )
    
  }
  changePage(event:PageChangedEvent)
  {
    this.request.numeroPagina = event.page
  this.filtrar()
  }
  changeItemsPerPage()
  {
    this.request.cantidad = this.itemsPerPage
    this.filtrar()
  } 
}
