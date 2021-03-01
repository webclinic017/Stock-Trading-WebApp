import { TestBed } from '@angular/core/testing';

import { Gservice2Service } from './gservice2.service';

describe('Gservice2Service', () => {
  let service: Gservice2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gservice2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
