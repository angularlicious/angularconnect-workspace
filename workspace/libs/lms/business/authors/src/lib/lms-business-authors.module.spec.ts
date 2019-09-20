import { async, TestBed } from '@angular/core/testing';
import { LmsBusinessAuthorsModule } from './lms-business-authors.module';

describe('LmsBusinessAuthorsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmsBusinessAuthorsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmsBusinessAuthorsModule).toBeDefined();
  });
});
