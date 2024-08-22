import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantCreditoRegisterComponent } from './mant-credito-register.component';

describe('MantCreditoRegisterComponent', () => {
  let component: MantCreditoRegisterComponent;
  let fixture: ComponentFixture<MantCreditoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantCreditoRegisterComponent]
    });
    fixture = TestBed.createComponent(MantCreditoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
