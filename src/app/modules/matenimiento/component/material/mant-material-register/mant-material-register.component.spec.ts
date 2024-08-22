import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantMaterialRegisterComponent } from './mant-material-register.component';

describe('MantMaterialRegisterComponent', () => {
  let component: MantMaterialRegisterComponent;
  let fixture: ComponentFixture<MantMaterialRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantMaterialRegisterComponent]
    });
    fixture = TestBed.createComponent(MantMaterialRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
