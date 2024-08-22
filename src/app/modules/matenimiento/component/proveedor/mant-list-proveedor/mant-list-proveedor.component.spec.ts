import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantListProveedorComponent } from './mant-list-proveedor.component';

describe('MantListProveedorComponent', () => {
  let component: MantListProveedorComponent;
  let fixture: ComponentFixture<MantListProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantListProveedorComponent]
    });
    fixture = TestBed.createComponent(MantListProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
