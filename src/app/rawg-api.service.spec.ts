import { TestBed } from '@angular/core/testing';

import { RawgApiService } from './rawg-api.service';

describe('RawgApiService', () => {
  let service: RawgApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawgApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
