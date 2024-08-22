import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRecupClaveComponent } from './formulario-recup-clave.component';

describe('FormularioRecupClaveComponent', () => {
  let component: FormularioRecupClaveComponent;
  let fixture: ComponentFixture<FormularioRecupClaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioRecupClaveComponent]
    });
    fixture = TestBed.createComponent(FormularioRecupClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
