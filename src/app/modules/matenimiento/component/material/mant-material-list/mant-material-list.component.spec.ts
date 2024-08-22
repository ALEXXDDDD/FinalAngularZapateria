import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantMaterialListComponent } from './mant-material-list.component';

describe('MantMaterialListComponent', () => {
  let component: MantMaterialListComponent;
  let fixture: ComponentFixture<MantMaterialListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantMaterialListComponent]
    });
    fixture = TestBed.createComponent(MantMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
