import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMapsGoogleComponent } from './api-maps-google.component';

describe('ApiMapsGoogleComponent', () => {
  let component: ApiMapsGoogleComponent;
  let fixture: ComponentFixture<ApiMapsGoogleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiMapsGoogleComponent]
    });
    fixture = TestBed.createComponent(ApiMapsGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
