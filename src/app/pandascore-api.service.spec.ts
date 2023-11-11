import { TestBed } from '@angular/core/testing';

import { PandascoreApiService } from './pandascore-api.service';

describe('PandascoreApiService', () => {
  let service: PandascoreApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PandascoreApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
