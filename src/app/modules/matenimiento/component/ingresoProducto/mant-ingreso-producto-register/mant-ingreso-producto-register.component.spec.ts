import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantIngresoProductoRegisterComponent } from './mant-ingreso-producto-register.component';

describe('MantIngresoProductoRegisterComponent', () => {
  let component: MantIngresoProductoRegisterComponent;
  let fixture: ComponentFixture<MantIngresoProductoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantIngresoProductoRegisterComponent]
    });
    fixture = TestBed.createComponent(MantIngresoProductoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
