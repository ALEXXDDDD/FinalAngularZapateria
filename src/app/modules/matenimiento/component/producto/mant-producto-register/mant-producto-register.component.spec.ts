import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MantProductoRegisterComponent } from './mant-producto-register.component';
import { ResponseProducto } from '../../../models/producto/producto-response.model';

describe('MantProductoRegisterComponent', () => {
  let component: MantProductoRegisterComponent;
  let fixture: ComponentFixture<MantProductoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantProductoRegisterComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(MantProductoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should preserve existing values when editing and form fields are empty', () => {
    component.accion = 2;
    component.producto = new ResponseProducto();
    component.producto.idProducto = 12;
    component.producto.nombreProd = 'Zapatilla Urbana';
    component.producto.codigoProd = 'PRODUCT-ZAP-NEG';
    component.producto.precioUnitario = 120;
    component.producto.stock = 5;
    component.producto.estadoProducto = true;
    component.producto.idUnidad = 2;
    component.producto.nombreUnidad = 'PARES';
    component.producto.categoria = 'Zapatillas';
    component.producto.fotografia = 'abc123';
    component.producto.nombreModelo = 'Urban';

    component.myForm.patchValue({
      nombreProd: '',
      codigoProd: '',
      precioUnitario: null,
      stock: null,
      estadoProducto: null,
      idUnidad: null,
      nombreUnidad: '',
      categoria: '',
      fotografia: '',
      nombreModelo: '',
      color: '',
      talla: '',
      descripcion: ''
    });

    const payload = component.construirPayloadParaGuardar();

    expect(payload.nombreProd).toBe('Zapatilla Urbana');
    expect(payload.codigoProd).toBe('PRODUCT-ZAP-NEG');
    expect(payload.precioUnitario).toBe(120);
    expect(payload.stock).toBe(5);
    expect(payload.color).toBeUndefined();
    expect(payload.talla).toBeUndefined();
    expect(payload.descripcion).toBeUndefined();
  });
});
function expect(component: MantProductoRegisterComponent) {
  throw new Error('Function not implemented.');
}

