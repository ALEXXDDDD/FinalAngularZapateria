import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantProduccionRegisterComponent } from './mant-produccion-register.component';

describe('MantProduccionRegisterComponent', () => {
  let component: MantProduccionRegisterComponent;
  let fixture: ComponentFixture<MantProduccionRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantProduccionRegisterComponent]
    });
    fixture = TestBed.createComponent(MantProduccionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
