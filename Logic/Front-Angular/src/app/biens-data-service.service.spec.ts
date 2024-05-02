import { TestBed } from '@angular/core/testing';

import { BiensDataServiceService } from './biens-data-service.service';

describe('BiensDataServiceService', () => {
  let service: BiensDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiensDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
