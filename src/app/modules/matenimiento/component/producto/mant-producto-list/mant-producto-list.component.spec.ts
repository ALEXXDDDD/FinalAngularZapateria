import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataViewModule } from 'primeng/dataview';
import { MantProductoListComponent } from './mant-producto-list.component';

describe('MantProductoListComponent', () => {
  let component: MantProductoListComponent;
  let fixture: ComponentFixture<MantProductoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantProductoListComponent]
    });
    fixture = TestBed.createComponent(MantProductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
