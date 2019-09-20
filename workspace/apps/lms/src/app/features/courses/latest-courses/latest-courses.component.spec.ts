import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCoursesComponent } from './latest-courses.component';

describe('LatestCoursesComponent', () => {
  let component: LatestCoursesComponent;
  let fixture: ComponentFixture<LatestCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestCoursesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
