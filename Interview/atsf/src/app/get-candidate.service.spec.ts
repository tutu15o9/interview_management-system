import { TestBed } from '@angular/core/testing';

import { GetCandidateService } from './get-candidate.service';

describe('GetCandidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCandidateService = TestBed.get(GetCandidateService);
    expect(service).toBeTruthy();
  });
});
