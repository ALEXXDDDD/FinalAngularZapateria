import { TestBed } from '@angular/core/testing';

import { SalidaMaterialService } from './salida-material.service';

describe('SalidaMaterialService', () => {
  let service: SalidaMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalidaMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
