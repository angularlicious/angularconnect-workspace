import { LoggingService } from '@angularlicious/logging';

import { ServiceContext } from '@angularlicious/rules-engine';
import { ServiceMessage } from '@angularlicious/rules-engine';
import { MessageType } from '@angularlicious/rules-engine';
import { Severity } from '@angularlicious/logging';

/**
 * Use the business provider base class to access common elements of the business provider.
 *
 * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
 */
export class BusinessProviderBase {
  providerName: string;
  serviceContext: ServiceContext;
  accessToken: string;

  constructor(providerName: string, public loggingService: LoggingService) {
    this.providerName = providerName;
    this.loggingService.log(this.providerName, Severity.Information, `Running constructor for the [${this.providerName}].`);
  }

  /**
   * Use to handle an unexpected error in the application. The error should implement
   * the specified interface. The method will add a new [ServiceMessage] to the
   * specified [ServiceContext].
   * @param error An unexpected application error that implements the [Error] interface.
   *
   * interface Error {
   *  name: string;
   *  message: string;
   *  stack?: string;
   * }
   */
  handleUnexpectedError(error: Error): void {
    const message = new ServiceMessage(error.name, error.message)
      .WithDisplayToUser(true)
      .WithMessageType(MessageType.Error)
      .WithSource(this.providerName);

    const logItem = `${message.toString()}; ${error.stack}`;
    this.loggingService.log(this.providerName, Severity.Error, logItem);

    this.serviceContext.addMessage(message);
  }

  finishRequest(sourceName: string): void {
    this.loggingService.log(this.providerName, Severity.Information, `Request for [${sourceName}] by ${this.providerName} is complete.`);
    if (this.serviceContext.hasErrors()) {
      this.loggingService.log(this.providerName, Severity.Information, `Preparing to write out the errors.`);
      this.serviceContext.Messages.filter(f => f.DisplayToUser && f.MessageType === MessageType.Error).forEach(e =>
        this.loggingService.log(this.providerName, Severity.Error, e.toString())
      );
    }
  }
}
