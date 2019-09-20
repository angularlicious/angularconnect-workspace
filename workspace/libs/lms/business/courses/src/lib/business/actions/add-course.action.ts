import { BusinessActionBase } from './business-action-base';
import { CourseIsValidRule } from '../rules/course-is-valid.rule';
import { Course } from '@angularlicious/lms-common';

export class AddCourseAction<T> extends BusinessActionBase<T> {
  constructor(private course: Course) {
    super('AddCourseAction');
  }

  preValidateAction() {
    this.validationContext.addRule(new CourseIsValidRule('CourseIsNotNull', 'The course information is not valid.', this.course, this.showRuleMessages));
  }

  performAction() {
    this.course.authorId = `authors/SHM5ZFUNFES4KGZ9vG9i`;
    this.response = this.businessProvider.apiService.addCourse<T>(this.course);
  }
}
