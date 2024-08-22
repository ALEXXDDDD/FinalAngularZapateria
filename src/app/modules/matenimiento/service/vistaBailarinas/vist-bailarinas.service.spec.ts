import { TestBed } from '@angular/core/testing';

import { VistBailarinasService } from './vist-bailarinas.service';

describe('VistBailarinasService', () => {
  let service: VistBailarinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistBailarinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
