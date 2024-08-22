import { TestBed } from '@angular/core/testing';

import { DetalleCreditoService } from './detalle-credito.service';

describe('DetalleCreditoService', () => {
  let service: DetalleCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
