import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantProveedorRegisterComponent } from './mant-proveedor-register.component';

describe('MantProveedorRegisterComponent', () => {
  let component: MantProveedorRegisterComponent;
  let fixture: ComponentFixture<MantProveedorRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantProveedorRegisterComponent]
    });
    fixture = TestBed.createComponent(MantProveedorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
