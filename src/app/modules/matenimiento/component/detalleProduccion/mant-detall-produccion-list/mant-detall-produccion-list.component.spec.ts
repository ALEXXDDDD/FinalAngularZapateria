import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDetallProduccionListComponent } from './mant-detall-produccion-list.component';

describe('MantDetallProduccionListComponent', () => {
  let component: MantDetallProduccionListComponent;
  let fixture: ComponentFixture<MantDetallProduccionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantDetallProduccionListComponent]
    });
    fixture = TestBed.createComponent(MantDetallProduccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
