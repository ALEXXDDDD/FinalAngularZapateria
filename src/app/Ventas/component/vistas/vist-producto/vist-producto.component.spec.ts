import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistProductoComponent } from './vist-producto.component';

describe('VistProductoComponent', () => {
  let component: VistProductoComponent;
  let fixture: ComponentFixture<VistProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistProductoComponent]
    });
    fixture = TestBed.createComponent(VistProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
