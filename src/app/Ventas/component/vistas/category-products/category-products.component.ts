import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import { ProductoService } from 'src/app/modules/matenimiento/service/producto/producto.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ProductFilterService } from 'src/app/services/product-filter/product-filter.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  category = '';
  products: ResponseProducto[] = [];
  searchTerm = '';
  currentPage = 1;
  readonly itemsPerPage = 6;
  loading = true;
  error = false;
  modalRef?: BsModalRef;
  selectedProduct = new ResponseProducto();
  readonly detailAction = AcciontConstants.detalle;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private productFilterService: ProductFilterService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.data['category'] || '';
    this.productFilterService.selectCategory(this.category);
    this.loadProducts();
  }

  get filteredProducts(): ResponseProducto[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.products;
    }

    return this.products.filter(product =>
      [product.nombreProd, product.codigoProd, product.nombreModelo, product.categoria]
        .some(value => value?.toLowerCase().includes(term))
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.itemsPerPage));
  }

  get pagedProducts(): ResponseProducto[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onSearch(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  addProducto(product: ResponseProducto): void {
    if ((product.stock ?? 0) > 0) {
      this.carritoService.addProducto(product);
      this.carritoService.sumarPrecios();
    }
  }

  verDetalle(template: TemplateRef<any>, product: ResponseProducto): void {
    this.selectedProduct = product;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered product-detail-modal',
      ignoreBackdropClick: false
    });
  }

  cerrarDetalle(): void {
    this.modalRef?.hide();
  }

  getImagenUrl(fotografia: string): string {
    if (!fotografia || fotografia === 'null' || fotografia === 'undefined') {
      return 'assets/img/img_Template/1.png';
    }

    const value = fotografia.trim().replace(/^['"]|['"]$/g, '');
    if (value.startsWith('data:image') || /^https?:\/\//i.test(value) || value.startsWith('assets/') || value.startsWith('/assets/')) {
      return value;
    }

    return `data:image/jpeg;base64,${value.replace(/\s/g, '')}`;
  }

  private loadProducts(): void {
    this.loading = true;
    this.error = false;
    this.productoService.getAll().subscribe({
      next: products => {
        this.products = (products || []).filter(product => this.matchesCategory(product));
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private matchesCategory(product: ResponseProducto): boolean {
    const categoryTerms: Record<string, string[]> = {
      zapatos: ['zapato'],
      zapatillas: ['zapatilla'],
      botines: ['botin'],
      bailarinas: ['bailarina', 'balerina'],
      tacones: ['tac']
    };
    const terms = categoryTerms[this.normalize(this.category)] || [this.normalize(this.category)];
    const productInfo = [product.nombreProd, product.categoria, product.nombreModelo]
      .map(value => this.normalize(value))
      .join(' ');

    return terms.some(term => productInfo.includes(term));
  }

  private normalize(value: string | undefined): string {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
