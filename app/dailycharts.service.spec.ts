import { TestBed } from '@angular/core/testing';

import { DailychartsService } from './dailycharts.service';

describe('DailychartsService', () => {
  let service: DailychartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailychartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
