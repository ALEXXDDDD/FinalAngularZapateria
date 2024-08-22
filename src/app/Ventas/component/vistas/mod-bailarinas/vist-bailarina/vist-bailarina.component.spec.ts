import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistBailarinaComponent } from './vist-bailarina.component';

describe('VistBailarinaComponent', () => {
  let component: VistBailarinaComponent;
  let fixture: ComponentFixture<VistBailarinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistBailarinaComponent]
    });
    fixture = TestBed.createComponent(VistBailarinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
