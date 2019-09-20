import { AddCourseAction } from './add-course.action';
import { Course } from '@angularlicious/lms-common';

describe('AddCourseAction', () => {
  it('should create an instance', () => {
    expect(new AddCourseAction(new Course())).toBeTruthy();
  });
});
