import { TestBed } from '@angular/core/testing';

import { PasarelaServiceService } from './pasarela-service.service';

describe('PasarelaServiceService', () => {
  let service: PasarelaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasarelaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
