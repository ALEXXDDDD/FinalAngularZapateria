import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDetalleComponent } from './listar-detalle.component';

describe('ListarDetalleComponent', () => {
  let component: ListarDetalleComponent;
  let fixture: ComponentFixture<ListarDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarDetalleComponent]
    });
    fixture = TestBed.createComponent(ListarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
