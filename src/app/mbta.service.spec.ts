import { TestBed } from '@angular/core/testing';

import { MbtaService } from './mbta.service';

describe('MbtaService', () => {
  let service: MbtaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MbtaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
