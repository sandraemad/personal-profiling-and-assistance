import { TestBed } from '@angular/core/testing';

import { AthuService } from './athu.service';

describe('AthuService', () => {
  let service: AthuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
