import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPersonaRegistrerComponent } from './mant-persona-registrer.component';

describe('MantPersonaRegistrerComponent', () => {
  let component: MantPersonaRegistrerComponent;
  let fixture: ComponentFixture<MantPersonaRegistrerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantPersonaRegistrerComponent]
    });
    fixture = TestBed.createComponent(MantPersonaRegistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
