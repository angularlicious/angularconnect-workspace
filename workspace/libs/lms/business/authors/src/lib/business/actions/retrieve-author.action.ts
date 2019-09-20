import { BusinessActionBase } from './business-action-base';

export class RetrieveAuthorAction<T> extends BusinessActionBase<T> {
  constructor(private authorId: string) {
    super('RetrieveAuthorAction');
  }

  preValidateAction() {
    // validate the input; author identifier must be valid;
  }

  performAction() {
    this.response = this.businessProvider.apiService.retrieveAuthor<T>(this.authorId);
  }
}
