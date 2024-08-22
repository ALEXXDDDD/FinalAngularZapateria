import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioDomicilioComponent } from './envio-domicilio.component';

describe('EnvioDomicilioComponent', () => {
  let component: EnvioDomicilioComponent;
  let fixture: ComponentFixture<EnvioDomicilioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvioDomicilioComponent]
    });
    fixture = TestBed.createComponent(EnvioDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
