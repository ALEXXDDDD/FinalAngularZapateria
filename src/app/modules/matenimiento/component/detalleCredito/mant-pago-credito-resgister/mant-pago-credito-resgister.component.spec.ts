import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPagoCreditoResgisterComponent } from './mant-pago-credito-resgister.component';

describe('MantPagoCreditoResgisterComponent', () => {
  let component: MantPagoCreditoResgisterComponent;
  let fixture: ComponentFixture<MantPagoCreditoResgisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantPagoCreditoResgisterComponent]
    });
    fixture = TestBed.createComponent(MantPagoCreditoResgisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
