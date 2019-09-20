import { IConfiguration } from '@angularlicious/configuration';
import { ILogglyConfig } from './i-loggly-config';

export class LogglyConfig implements IConfiguration {
  applicationName: string;
  version: string;
  logglyConfig: ILogglyConfig;
}
