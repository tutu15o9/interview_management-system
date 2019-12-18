import { TestBed } from '@angular/core/testing';

import { GetappliedService } from './getapplied.service';

describe('GetappliedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetappliedService = TestBed.get(GetappliedService);
    expect(service).toBeTruthy();
  });
});
