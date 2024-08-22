import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeBodyComponent } from './welcome-body.component';

describe('WelcomeBodyComponent', () => {
  let component: WelcomeBodyComponent;
  let fixture: ComponentFixture<WelcomeBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeBodyComponent]
    });
    fixture = TestBed.createComponent(WelcomeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
