import { TestBed } from '@angular/core/testing';

import { BusinessProviderService } from './business-provider.service';

describe('BusinessProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessProviderService = TestBed.get(BusinessProviderService);
    expect(service).toBeTruthy();
  });
});
