import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantEmplAreaListComponent } from './mant-empl-area-list.component';

describe('MantEmplAreaListComponent', () => {
  let component: MantEmplAreaListComponent;
  let fixture: ComponentFixture<MantEmplAreaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantEmplAreaListComponent]
    });
    fixture = TestBed.createComponent(MantEmplAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
