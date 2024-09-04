import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantUsuarioRegiActuaComponent } from './mant-usuario-regi-actua.component';

describe('MantUsuarioRegiActuaComponent', () => {
  let component: MantUsuarioRegiActuaComponent;
  let fixture: ComponentFixture<MantUsuarioRegiActuaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantUsuarioRegiActuaComponent]
    });
    fixture = TestBed.createComponent(MantUsuarioRegiActuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
