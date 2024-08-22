import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantModeloResgisterComponent } from './mant-modelo-resgister.component';

describe('MantModeloResgisterComponent', () => {
  let component: MantModeloResgisterComponent;
  let fixture: ComponentFixture<MantModeloResgisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantModeloResgisterComponent]
    });
    fixture = TestBed.createComponent(MantModeloResgisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
