import { async, TestBed } from '@angular/core/testing';
import { RulesEngineModule } from './rules-engine.module';

describe('RulesEngineModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RulesEngineModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RulesEngineModule).toBeDefined();
  });
});
