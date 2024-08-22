import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderpasarelaComponent } from './headerpasarela.component';

describe('HeaderpasarelaComponent', () => {
  let component: HeaderpasarelaComponent;
  let fixture: ComponentFixture<HeaderpasarelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderpasarelaComponent]
    });
    fixture = TestBed.createComponent(HeaderpasarelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
