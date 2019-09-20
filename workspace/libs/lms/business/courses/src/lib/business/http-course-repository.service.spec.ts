import { TestBed } from '@angular/core/testing';

import { HttpCourseRepositoryService } from './HttpCourseRepositoryService';

describe('HttpCourseRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCourseRepositoryService = TestBed.get(HttpCourseRepositoryService);
    expect(service).toBeTruthy();
  });
});
