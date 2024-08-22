import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantCreditoListComponent } from './mant-credito-list.component';

describe('MantCreditoListComponent', () => {
  let component: MantCreditoListComponent;
  let fixture: ComponentFixture<MantCreditoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantCreditoListComponent]
    });
    fixture = TestBed.createComponent(MantCreditoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
