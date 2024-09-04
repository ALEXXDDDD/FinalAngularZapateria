import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeFooterComponent } from './welcome-footer.component';

describe('WelcomeFooterComponent', () => {
  let component: WelcomeFooterComponent;
  let fixture: ComponentFixture<WelcomeFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeFooterComponent]
    });
    fixture = TestBed.createComponent(WelcomeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
