import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistZapatillaComponent } from './vist-zapatilla.component';

describe('VistZapatillaComponent', () => {
  let component: VistZapatillaComponent;
  let fixture: ComponentFixture<VistZapatillaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistZapatillaComponent]
    });
    fixture = TestBed.createComponent(VistZapatillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
