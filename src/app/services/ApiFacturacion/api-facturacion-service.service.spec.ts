import { TestBed } from '@angular/core/testing';

import { ApiFacturacionServiceService } from './api-facturacion-service.service';

describe('ApiFacturacionServiceService', () => {
  let service: ApiFacturacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFacturacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
