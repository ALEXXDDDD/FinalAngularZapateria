import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistModelosComponent } from './vist-modelos.component';

describe('VistModelosComponent', () => {
  let component: VistModelosComponent;
  let fixture: ComponentFixture<VistModelosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistModelosComponent]
    });
    fixture = TestBed.createComponent(VistModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
