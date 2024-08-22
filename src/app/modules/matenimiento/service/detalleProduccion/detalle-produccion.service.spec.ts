import { TestBed } from '@angular/core/testing';

import { DetalleProduccionService } from './detalle-produccion.service';

describe('DetalleProduccionService', () => {
  let service: DetalleProduccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleProduccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
