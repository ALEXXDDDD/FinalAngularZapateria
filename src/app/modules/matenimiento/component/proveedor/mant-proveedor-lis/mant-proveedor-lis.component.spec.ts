import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantProveedorLisComponent } from './mant-proveedor-lis.component';

describe('MantProveedorLisComponent', () => {
  let component: MantProveedorLisComponent;
  let fixture: ComponentFixture<MantProveedorLisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantProveedorLisComponent]
    });
    fixture = TestBed.createComponent(MantProveedorLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
