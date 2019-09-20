import { BusinessActionBase } from './business-action-base';
import { Course } from '@angularlicious/lms-common';
import { Severity } from '@angularlicious/logging';
import { IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';

export class RetrieveCourseVideosAction<T> extends BusinessActionBase<T> {
  private course: Course;
  hideErrorMessageFromUser: boolean;
  showErrorMessageToUser: boolean;

  constructor(course: Course) {
    super('RetrieveCourseVideosAction');
    this.course = course;
  }

  preValidateAction() {
    // validate course; id required; not null;
    this.validationContext.addRule(new IsNotNullOrUndefined('CourseIsValid', `The target course is not valid.`, this.course, this.hideErrorMessageFromUser));

    this.validationContext.addRule(new StringIsNotNullEmptyRange('CourseIdIsValid', 'The course identifier is not valid.', this.course.id, 1, 80, this.showErrorMessageToUser));
  }

  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to perform action business logic.`);
    this.response = this.businessProvider.apiService.retrieveLatestCourseVideos<T>(this.course);
  }
}
