import { TestBed } from '@angular/core/testing';

import { SleepingDataService } from './sleeping-data.service';

describe('SleepingDataService', () => {
  let service: SleepingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
