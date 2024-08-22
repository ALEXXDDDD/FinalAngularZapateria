import { TestBed } from '@angular/core/testing';

import { AuthGoggleServiceService } from './auth-goggle-service.service';

describe('AuthGoggleServiceService', () => {
  let service: AuthGoggleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGoggleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
