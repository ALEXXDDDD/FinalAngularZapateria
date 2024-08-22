import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantProduccionListComponent } from './mant-produccion-list.component';

describe('MantProduccionListComponent', () => {
  let component: MantProduccionListComponent;
  let fixture: ComponentFixture<MantProduccionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantProduccionListComponent]
    });
    fixture = TestBed.createComponent(MantProduccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
