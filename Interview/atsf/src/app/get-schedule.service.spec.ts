import { TestBed } from '@angular/core/testing';

import { GetScheduleService } from './get-schedule.service';

describe('GetScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetScheduleService = TestBed.get(GetScheduleService);
    expect(service).toBeTruthy();
  });
});
