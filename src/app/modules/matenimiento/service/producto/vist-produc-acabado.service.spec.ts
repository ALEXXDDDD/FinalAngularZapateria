import { TestBed } from '@angular/core/testing';

import { VistProducAcabadoService } from './vist-produc-acabado.service';

describe('VistProducAcabadoService', () => {
  let service: VistProducAcabadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistProducAcabadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
