import { BusinessActionBase } from './business-action-base';
import { Severity } from '@angularlicious/logging';

export class RetrieveLatestCoursesAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveLatestCoursesAction');
  }

  preValidateAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to validate action.`);
  }

  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to perform action business logic.`);
    this.response = this.businessProvider.apiService.retrieveLatestCourses<T>();
  }
}
