import { IConfiguration } from '@angularlicious/configuration';
import { ILoggingConfig } from '@angularlicious/logging';
import { IErrorHandingConfig } from '@angularlicious/error-handling';
import { ILogglyConfig } from '@angularlicious/logging';

export class AppConfig implements IConfiguration {
  applicationName: 'BuildMotion';
  version: '2.0.0';
  loggingConfig: ILoggingConfig = {
    applicationName: this.applicationName,
    isProduction: false,
    version: this.version,
  };
  errorHandlingConfig: IErrorHandingConfig = {
    applicationName: this.applicationName,
    includeDefaultErrorHandling: true,
  };
  logglyConfig: ILogglyConfig = {
    apiKey: '01e4b3aa-f301-43e7-bf60-40ba5d0729d4',
    sendConsoleErrors: true,
  };
}
