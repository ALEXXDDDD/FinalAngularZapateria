import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSidebarComponent } from './inicio-sidebar.component';

describe('InicioSidebarComponent', () => {
  let component: InicioSidebarComponent;
  let fixture: ComponentFixture<InicioSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioSidebarComponent]
    });
    fixture = TestBed.createComponent(InicioSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
