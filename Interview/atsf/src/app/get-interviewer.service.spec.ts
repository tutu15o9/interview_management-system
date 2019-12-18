import { TestBed } from '@angular/core/testing';

import { GetInterviewerService } from './get-interviewer.service';

describe('GetInterviewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetInterviewerService = TestBed.get(GetInterviewerService);
    expect(service).toBeTruthy();
  });
});
