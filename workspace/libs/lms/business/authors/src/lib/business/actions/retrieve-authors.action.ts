import { BusinessActionBase } from './business-action-base';

export class RetrieveAuthorsAction<T> extends BusinessActionBase<T> {
  constructor() {
    super('RetrieveAuthorsAction');
  }

  preValidateAction() {
    // add any business rules here; user must be an admin to retrieve all authors;
  }

  performAction() {
    this.response = this.businessProvider.apiService.retrieveAuthors<T>();
  }
}
