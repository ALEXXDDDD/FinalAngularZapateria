import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantClienteRegisterComponent } from './mant-cliente-register.component';

describe('MantClienteRegisterComponent', () => {
  let component: MantClienteRegisterComponent;
  let fixture: ComponentFixture<MantClienteRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantClienteRegisterComponent]
    });
    fixture = TestBed.createComponent(MantClienteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
