import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantModeloListComponent } from './mant-modelo-list.component';

describe('MantModeloListComponent', () => {
  let component: MantModeloListComponent;
  let fixture: ComponentFixture<MantModeloListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantModeloListComponent]
    });
    fixture = TestBed.createComponent(MantModeloListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
