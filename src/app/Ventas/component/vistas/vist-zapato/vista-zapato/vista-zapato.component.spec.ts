import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaZapatoComponent } from './vista-zapato.component';

describe('VistaZapatoComponent', () => {
  let component: VistaZapatoComponent;
  let fixture: ComponentFixture<VistaZapatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaZapatoComponent]
    });
    fixture = TestBed.createComponent(VistaZapatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
