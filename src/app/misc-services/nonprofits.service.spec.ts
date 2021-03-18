import { TestBed } from '@angular/core/testing';

import { NonprofitsService } from './nonprofits.service';

describe('NonprofitsService', () => {
  let service: NonprofitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonprofitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
