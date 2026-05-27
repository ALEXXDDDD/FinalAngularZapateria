import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantComprobanteDetallRegisterComponent } from './mant-comprobante-detall-register.component';

describe('MantComprobanteDetallRegisterComponent', () => {
  let component: MantComprobanteDetallRegisterComponent;
  let fixture: ComponentFixture<MantComprobanteDetallRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantComprobanteDetallRegisterComponent]
    });
    fixture = TestBed.createComponent(MantComprobanteDetallRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
