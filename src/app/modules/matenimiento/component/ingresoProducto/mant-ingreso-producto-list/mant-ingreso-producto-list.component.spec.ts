import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantIngresoProductoListComponent } from './mant-ingreso-producto-list.component';

describe('MantIngresoProductoListComponent', () => {
  let component: MantIngresoProductoListComponent;
  let fixture: ComponentFixture<MantIngresoProductoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantIngresoProductoListComponent]
    });
    fixture = TestBed.createComponent(MantIngresoProductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
