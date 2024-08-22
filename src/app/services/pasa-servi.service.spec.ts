import { TestBed } from '@angular/core/testing';

import { PasaServiService } from './pasa-servi.service';

describe('PasaServiService', () => {
  let service: PasaServiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasaServiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
