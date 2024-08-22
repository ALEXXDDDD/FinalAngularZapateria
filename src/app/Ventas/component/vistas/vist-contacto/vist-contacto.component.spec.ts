import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistContactoComponent } from './vist-contacto.component';

describe('VistContactoComponent', () => {
  let component: VistContactoComponent;
  let fixture: ComponentFixture<VistContactoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistContactoComponent]
    });
    fixture = TestBed.createComponent(VistContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
