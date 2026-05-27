import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantInforVentaComponent } from './mant-infor-venta.component';

describe('MantInforVentaComponent', () => {
  let component: MantInforVentaComponent;
  let fixture: ComponentFixture<MantInforVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantInforVentaComponent]
    });
    fixture = TestBed.createComponent(MantInforVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
