import { async, TestBed } from '@angular/core/testing';
import { LmsCommonModule } from './lms-common.module';

describe('LmsCommonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmsCommonModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmsCommonModule).toBeDefined();
  });
});
