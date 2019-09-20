import { TestBed } from '@angular/core/testing';

import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorsService = TestBed.get(AuthorsService);
    expect(service).toBeTruthy();
  });
});
