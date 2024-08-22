import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilListComponent } from './perfil-list.component';

describe('PerfilListComponent', () => {
  let component: PerfilListComponent;
  let fixture: ComponentFixture<PerfilListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilListComponent]
    });
    fixture = TestBed.createComponent(PerfilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
