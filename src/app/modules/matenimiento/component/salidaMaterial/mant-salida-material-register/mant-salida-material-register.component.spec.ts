import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantSalidaMaterialRegisterComponent } from './mant-salida-material-register.component';

describe('MantSalidaMaterialRegisterComponent', () => {
  let component: MantSalidaMaterialRegisterComponent;
  let fixture: ComponentFixture<MantSalidaMaterialRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantSalidaMaterialRegisterComponent]
    });
    fixture = TestBed.createComponent(MantSalidaMaterialRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
