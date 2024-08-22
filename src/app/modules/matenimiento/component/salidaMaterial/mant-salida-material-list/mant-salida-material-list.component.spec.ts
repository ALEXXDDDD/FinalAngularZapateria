import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantSalidaMaterialListComponent } from './mant-salida-material-list.component';

describe('MantSalidaMaterialListComponent', () => {
  let component: MantSalidaMaterialListComponent;
  let fixture: ComponentFixture<MantSalidaMaterialListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantSalidaMaterialListComponent]
    });
    fixture = TestBed.createComponent(MantSalidaMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
