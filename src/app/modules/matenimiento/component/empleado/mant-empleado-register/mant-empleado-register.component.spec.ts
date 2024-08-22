import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantEmpleadoRegisterComponent } from './mant-empleado-register.component';

describe('MantEmpleadoRegisterComponent', () => {
  let component: MantEmpleadoRegisterComponent;
  let fixture: ComponentFixture<MantEmpleadoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantEmpleadoRegisterComponent]
    });
    fixture = TestBed.createComponent(MantEmpleadoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
