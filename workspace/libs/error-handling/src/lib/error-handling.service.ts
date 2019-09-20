import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService, Severity } from '@angularlicious/logging';
import { ConfigurationService, IConfiguration } from '@angularlicious/configuration';
import { ErrorHandlingConfig } from './config/error-handling-config';
import { noop } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService extends ErrorHandler {
  serviceName = 'ErrorHandlingService';
  config: ErrorHandlingConfig;
  hasSettings: boolean;

  constructor(private configService: ConfigurationService, private loggingService: LoggingService) {
    super();

    this.init();
  }

  init() {
    // Use to provide default settings for error handling processing.
    this.config = new ErrorHandlingConfig();
    this.config.errorHandlingConfig = {
      applicationName: '',
      includeDefaultErrorHandling: true,
    };
    this.config.errorHandlingConfig.applicationName = 'ErrorHandlerService';
    this.config.errorHandlingConfig.includeDefaultErrorHandling = false;
    console.warn(`Application [ErrorHandler] is using default settings`);

    // subscribe and use settings from the [ConfigurationService] when available.
    this.configService.settings$.subscribe(settings => this.handleSettings(settings));
  }

  handleSettings(settings: IConfiguration) {
    this.config = settings as ErrorHandlingConfig;
    this.hasSettings = true;
    this.loggingService.log(this.config.errorHandlingConfig.applicationName, Severity.Information, `Application [ErrorHandler] using configuration settings.`);
  }

  handleError(error: Error | HttpErrorResponse): any {
    if (this.config.errorHandlingConfig.includeDefaultErrorHandling) {
      // use the [super] call to keep default error handling functionality --> console;
      super.handleError(error);
    }

    if (this.hasSettings) {
      // A. HANDLE ERRORS FROM HTTP
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A.1: A client-side or network error occurred. Handle it accordingly.
          const formattedError = `${error.name}; ${error.message}`;
          this.loggingService.log(this.config.errorHandlingConfig.applicationName, Severity.Error, `${formattedError}`);
        } else {
          // A.2: The API returned an unsuccessful response (i.e., 400, 401, 403, etc.).
          /**
           * The [HttpService] should return a response that is consumable by the caller
           * of the API. The response should include relevant information and error messages
           * in a format that is known and consumable by the caller of the API.
           */
          noop();
        }
      } else {
        // B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT;
        const formattedError = `${error.name}; ${error.message}`;
        this.loggingService.log(this.config.errorHandlingConfig.applicationName, Severity.Error, `${formattedError}`);
      }
    }
  }
}
