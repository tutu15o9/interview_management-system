import { TestBed } from '@angular/core/testing';

import { GetjobService } from './getjob.service';

describe('GetjobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetjobService = TestBed.get(GetjobService);
    expect(service).toBeTruthy();
  });
});
