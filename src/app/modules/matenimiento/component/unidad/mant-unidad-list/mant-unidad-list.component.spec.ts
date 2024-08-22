import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantUnidadListComponent } from './mant-unidad-list.component';

describe('MantUnidadListComponent', () => {
  let component: MantUnidadListComponent;
  let fixture: ComponentFixture<MantUnidadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantUnidadListComponent]
    });
    fixture = TestBed.createComponent(MantUnidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
