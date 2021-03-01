import { TestBed } from '@angular/core/testing';

import { WserviceService } from './wservice.service';

describe('WserviceService', () => {
  let service: WserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
