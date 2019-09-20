import { async, TestBed } from '@angular/core/testing';
import { FoundationModule } from './foundation.module';

describe('FoundationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FoundationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FoundationModule).toBeDefined();
  });
});
