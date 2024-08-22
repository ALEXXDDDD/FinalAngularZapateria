import { TestBed } from '@angular/core/testing';

import { VistMaterialesAcabadosService } from './vist-materiales-acabados.service';

describe('VistMaterialesAcabadosService', () => {
  let service: VistMaterialesAcabadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistMaterialesAcabadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
