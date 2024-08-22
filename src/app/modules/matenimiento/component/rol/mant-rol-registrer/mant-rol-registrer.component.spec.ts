import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantRolRegistrerComponent } from './mant-rol-registrer.component';

describe('MantRolRegistrerComponent', () => {
  let component: MantRolRegistrerComponent;
  let fixture: ComponentFixture<MantRolRegistrerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantRolRegistrerComponent]
    });
    fixture = TestBed.createComponent(MantRolRegistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
