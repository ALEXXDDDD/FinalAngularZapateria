import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantProdModLisComponent } from './mant-prod-mod-lis.component';

describe('MantProdModLisComponent', () => {
  let component: MantProdModLisComponent;
  let fixture: ComponentFixture<MantProdModLisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantProdModLisComponent]
    });
    fixture = TestBed.createComponent(MantProdModLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
