import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

import { CarritoComprasComponent } from './carrito-compras.component';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

describe('CarritoComprasComponent', () => {
  let component: CarritoComprasComponent;
  let fixture: ComponentFixture<CarritoComprasComponent>;
  let router: Router;

  beforeEach(async () => {
    const carritoServiceSpy = jasmine.createSpyObj('CarritoService', ['sumarPrecios', 'listarCarrito', 'obtenerTotal', 'removeProducto', 'editarCantidad']);
    carritoServiceSpy.sumarPrecios.and.returnValue(0);
    carritoServiceSpy.listarCarrito.and.returnValue(of([]));
    carritoServiceSpy.obtenerTotal.and.returnValue(0);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CarritoComprasComponent],
      providers: [
        { provide: CarritoService, useValue: carritoServiceSpy },
        { provide: BsModalService, useValue: { show: jasmine.createSpy('show') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComprasComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to pasarela when pagar is clicked and the cart has items', () => {
    component.carrito = [
      { producto: { idProducto: 1, precioUnitario: 10, nombreProd: 'Zapato', fotografia: '' }, cantidad: 1 } as any
    ];

    const navigateSpy = spyOn(router, 'navigate');

    component.irAPagar();

    expect(navigateSpy).toHaveBeenCalledWith(['/pasarela']);
  });
});
