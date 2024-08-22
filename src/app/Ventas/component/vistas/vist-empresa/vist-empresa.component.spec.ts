import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistEmpresaComponent } from './vist-empresa.component';

describe('VistEmpresaComponent', () => {
  let component: VistEmpresaComponent;
  let fixture: ComponentFixture<VistEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistEmpresaComponent]
    });
    fixture = TestBed.createComponent(VistEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
