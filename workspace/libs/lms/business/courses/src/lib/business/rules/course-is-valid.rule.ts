import { CompositeRule, IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@angularlicious/rules-engine';
import { Course } from '@angularlicious/lms-common';

export class CourseIsValidRule extends CompositeRule {
  constructor(name: string, message: string, private target: Course, isDisplayable: boolean) {
    super(name, message, isDisplayable);
    this.configureRules();
  }

  configureRules() {
    this.rules.push(new IsNotNullOrUndefined('CourseIsNotNull', 'The course information is not valid.', this.target, this.isDisplayable));

    if (this.target !== undefined) {
      this.rules.push(
        new StringIsNotNullEmptyRange('TitleIsValid', 'The title value is not valid. Must be within 3 and 200 characters.', this.target.title, 3, 200, this.isDisplayable)
      );

      this.rules.push(new StringIsNotNullEmptyRange('DescriptionIsValid', 'The description value must with within 10 and 600 characters.', this.target.description, 10, 600));

      this.rules.push(new StringIsNotNullEmptyRange('CategoryIsValid', 'The required category value is not valid.', this.target.category, 1, 80, this.isDisplayable));
    }
  }
}
