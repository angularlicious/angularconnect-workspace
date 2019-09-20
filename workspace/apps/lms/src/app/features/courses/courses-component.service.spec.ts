import { TestBed } from '@angular/core/testing';

import { CoursesUIService } from './courses-ui.service';

describe('CoursesComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesUIService = TestBed.get(CoursesUIService);
    expect(service).toBeTruthy();
  });
});
