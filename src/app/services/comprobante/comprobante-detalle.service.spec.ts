import { TestBed } from '@angular/core/testing';

import { ComprobanteDetalleService } from './comprobante-detalle.service';

describe('ComprobanteProveedorService', () => {
  let service: ComprobanteDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobanteDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
