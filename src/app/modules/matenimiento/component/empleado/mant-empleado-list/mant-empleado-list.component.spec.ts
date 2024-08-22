import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantEmpleadoListComponent } from './mant-empleado-list.component';

describe('MantEmpleadoListComponent', () => {
  let component: MantEmpleadoListComponent;
  let fixture: ComponentFixture<MantEmpleadoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantEmpleadoListComponent]
    });
    fixture = TestBed.createComponent(MantEmpleadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
