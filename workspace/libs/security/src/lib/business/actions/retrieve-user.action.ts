import { BusinessActionBase } from './business-action-base';
import { StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';

export class RetrieveUserAction<T> extends BusinessActionBase<T> {
  constructor(private userId: string) {
    super('RetrieveAuthorAction');
  }

  preValidateAction() {
    // validate the input; author identifier must be valid;
    this.validationContext.addRule(
      new StringIsNotNullEmptyRange('UserIdIsValid', 'The user identifier is not valid. Cannot retrieve user information.', this.userId, 3, 80, this.hideRuleMessages)
    );
  }

  performAction() {
    this.response = this.businessProvider.apiService.retrieveUser<T>(this.userId);
  }
}
