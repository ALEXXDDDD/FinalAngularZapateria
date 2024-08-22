import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDetalleCreditoRegisterComponent } from './mant-detalle-credito-register.component';

describe('MantDetalleCreditoRegisterComponent', () => {
  let component: MantDetalleCreditoRegisterComponent;
  let fixture: ComponentFixture<MantDetalleCreditoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantDetalleCreditoRegisterComponent]
    });
    fixture = TestBed.createComponent(MantDetalleCreditoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
