import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantUnidadResgisterComponent } from './mant-unidad-resgister.component';

describe('MantUnidadResgisterComponent', () => {
  let component: MantUnidadResgisterComponent;
  let fixture: ComponentFixture<MantUnidadResgisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantUnidadResgisterComponent]
    });
    fixture = TestBed.createComponent(MantUnidadResgisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
