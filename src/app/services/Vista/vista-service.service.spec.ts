import { TestBed } from '@angular/core/testing';

import { VistaServiceService } from './vista-service.service';

describe('VistaServiceService', () => {
  let service: VistaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
