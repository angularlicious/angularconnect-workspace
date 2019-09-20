import { async, TestBed } from '@angular/core/testing';
import { LmsBusinessCoursesModule } from './lms-business-courses.module';

describe('LmsBusinessCoursesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmsBusinessCoursesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmsBusinessCoursesModule).toBeDefined();
  });
});
