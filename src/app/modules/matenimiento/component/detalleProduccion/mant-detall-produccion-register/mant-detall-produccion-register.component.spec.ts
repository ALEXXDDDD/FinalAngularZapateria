import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDetallProduccionRegisterComponent } from './mant-detall-produccion-register.component';

describe('MantDetallProduccionRegisterComponent', () => {
  let component: MantDetallProduccionRegisterComponent;
  let fixture: ComponentFixture<MantDetallProduccionRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantDetallProduccionRegisterComponent]
    });
    fixture = TestBed.createComponent(MantDetallProduccionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
