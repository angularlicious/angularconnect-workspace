import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAuthorComponent } from './course-author.component';

describe('CourseAuthorComponent', () => {
  let component: CourseAuthorComponent;
  let fixture: ComponentFixture<CourseAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAuthorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
