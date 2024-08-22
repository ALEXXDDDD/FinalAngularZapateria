import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDetalleCreditoLisComponent } from './mant-detalle-credito-lis.component';

describe('MantDetalleCreditoLisComponent', () => {
  let component: MantDetalleCreditoLisComponent;
  let fixture: ComponentFixture<MantDetalleCreditoLisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantDetalleCreditoLisComponent]
    });
    fixture = TestBed.createComponent(MantDetalleCreditoLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
