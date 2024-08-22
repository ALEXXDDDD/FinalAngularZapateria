import { TestBed } from '@angular/core/testing';

import { VistZapatillasService } from './vist-zapatillas.service';

describe('VistZapatillasService', () => {
  let service: VistZapatillasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistZapatillasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
