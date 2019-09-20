import { ILoggingConfig } from './i-logging-config';
import { Injectable } from '@angular/core';
import { IConfiguration } from '@angularlicious/configuration';

@Injectable()
export class LoggingConfig implements IConfiguration {
  applicationName: string;
  version: string;
  loggingConfig: ILoggingConfig;
}
