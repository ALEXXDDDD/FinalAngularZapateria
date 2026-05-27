import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantComprobanteProveedorListComponent } from './mant-comprobante-proveedor-list.component';

describe('MantComprobanteProveedorListComponent', () => {
  let component: MantComprobanteProveedorListComponent;
  let fixture: ComponentFixture<MantComprobanteProveedorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantComprobanteProveedorListComponent]
    });
    fixture = TestBed.createComponent(MantComprobanteProveedorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
