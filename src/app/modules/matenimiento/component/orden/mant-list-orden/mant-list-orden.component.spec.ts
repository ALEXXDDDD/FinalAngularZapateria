import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantListOrdenComponent } from './mant-list-orden.component';

describe('MantListOrdenComponent', () => {
  let component: MantListOrdenComponent;
  let fixture: ComponentFixture<MantListOrdenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantListOrdenComponent]
    });
    fixture = TestBed.createComponent(MantListOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
