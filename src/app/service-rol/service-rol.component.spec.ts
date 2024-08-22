import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRolComponent } from './service-rol.component';

describe('ServiceRolComponent', () => {
  let component: ServiceRolComponent;
  let fixture: ComponentFixture<ServiceRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRolComponent]
    });
    fixture = TestBed.createComponent(ServiceRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
