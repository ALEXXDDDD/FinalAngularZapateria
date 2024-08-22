import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantRolRegisterMultipleComponent } from './mant-rol-register-multiple.component';

describe('MantRolRegisterMultipleComponent', () => {
  let component: MantRolRegisterMultipleComponent;
  let fixture: ComponentFixture<MantRolRegisterMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantRolRegisterMultipleComponent]
    });
    fixture = TestBed.createComponent(MantRolRegisterMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
