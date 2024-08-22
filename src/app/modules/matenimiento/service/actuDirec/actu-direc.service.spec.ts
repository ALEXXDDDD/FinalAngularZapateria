import { TestBed } from '@angular/core/testing';

import { ActuDirecService } from './actu-direc.service';

describe('ActuDirecService', () => {
  let service: ActuDirecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActuDirecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
