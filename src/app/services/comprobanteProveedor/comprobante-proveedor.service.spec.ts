import { TestBed } from '@angular/core/testing';

import { ComprobanteProveedorService } from './comprobante-proveedor.service';

describe('ComprobanteProveedorService', () => {
  let service: ComprobanteProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobanteProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
