import { TestBed } from '@angular/core/testing';

import { VistZapatosService } from './vist-zapatos.service';

describe('VistZapatosService', () => {
  let service: VistZapatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistZapatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
