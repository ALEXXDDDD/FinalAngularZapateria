import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantRegisterOrdenComponent } from './mant-register-orden.component';

describe('MantRegisterOrdenComponent', () => {
  let component: MantRegisterOrdenComponent;
  let fixture: ComponentFixture<MantRegisterOrdenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantRegisterOrdenComponent]
    });
    fixture = TestBed.createComponent(MantRegisterOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
