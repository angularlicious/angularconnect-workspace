import { BusinessActionBase } from './business-action-base';

export class RetrieveUsersAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveUsersAction');
  }

  preValidateAction() {
    // add any business rules here; user must be an admin to retrieve all authors;
  }

  performAction() {
    this.response = this.businessProvider.apiService.retrieveUsers<T>();
  }
}
