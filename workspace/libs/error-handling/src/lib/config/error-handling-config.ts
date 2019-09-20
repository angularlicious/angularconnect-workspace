import { IErrorHandingConfig } from './i-error-handling-config';
import { IConfiguration } from '@angularlicious/configuration';

export class ErrorHandlingConfig implements IConfiguration {
  applicationName: string;
  version: string;
  errorHandlingConfig: IErrorHandingConfig;
}
