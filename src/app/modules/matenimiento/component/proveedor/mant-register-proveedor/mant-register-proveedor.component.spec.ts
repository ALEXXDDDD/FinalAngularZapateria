import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantRegisterProveedorComponent } from './mant-register-proveedor.component';

describe('MantRegisterProveedorComponent', () => {
  let component: MantRegisterProveedorComponent;
  let fixture: ComponentFixture<MantRegisterProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantRegisterProveedorComponent]
    });
    fixture = TestBed.createComponent(MantRegisterProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
