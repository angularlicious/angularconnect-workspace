import { async, TestBed } from '@angular/core/testing';
import { ActionsModule } from './actions.module';

describe('ActionsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ActionsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ActionsModule).toBeDefined();
  });
});
