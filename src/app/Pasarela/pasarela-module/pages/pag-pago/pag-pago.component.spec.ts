import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPagoComponent } from './pag-pago.component';

describe('PagPagoComponent', () => {
  let component: PagPagoComponent;
  let fixture: ComponentFixture<PagPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagPagoComponent]
    });
    fixture = TestBed.createComponent(PagPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
