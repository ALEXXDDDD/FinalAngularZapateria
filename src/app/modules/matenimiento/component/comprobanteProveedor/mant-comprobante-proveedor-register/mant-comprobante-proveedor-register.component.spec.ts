import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantComprobanteProveedorRegisterComponent } from './mant-comprobante-proveedor-register.component';

describe('MantComprobanteProveedorRegisterComponent', () => {
  let component: MantComprobanteProveedorRegisterComponent;
  let fixture: ComponentFixture<MantComprobanteProveedorRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantComprobanteProveedorRegisterComponent]
    });
    fixture = TestBed.createComponent(MantComprobanteProveedorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
