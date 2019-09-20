import { Injectable, Optional } from '@angular/core';

import { Severity } from './severity.enum';
import { IConfiguration } from '@angularlicious/configuration';
import { ConfigurationService } from '@angularlicious/configuration';
import { LogEntry } from './log-entry';
import { Subject, ReplaySubject } from 'rxjs';
import { ILogEntry } from './i-log-entry';
import { LoggingConfig } from './config/logging-config';

@Injectable()
export class LoggingService {
  serviceName = 'LoggingService';
  source: string;
  severity: Severity;
  message: string;
  timestamp: Date;
  applicationName = 'application';
  version = '0.0.0';
  isProduction: boolean;
  config: LoggingConfig;

  logEntries$: Subject<ILogEntry> = new ReplaySubject<ILogEntry>(1);

  /**
   * The [LoggingService] constructor.
   */
  constructor(@Optional() public configService: ConfigurationService) {
    this.timestamp = new Date(Date.now());
    this.log(this.serviceName, Severity.Information, `Starting logging service at: ${this.timestamp}`);

    if (configService) {
      this.configService.settings$.subscribe(settings => this.handleSettings(settings));
    }
  }

  handleSettings(settings: IConfiguration) {
    this.config = settings as LoggingConfig;
    this.applicationName = this.config && this.config.loggingConfig.applicationName ? this.config.loggingConfig.applicationName : 'application';
    this.version = this.config && this.config.loggingConfig.version ? this.config.loggingConfig.version : '0.0.0';
    this.isProduction = this.config && this.config.loggingConfig.isProduction ? this.config.loggingConfig.isProduction : false;
  }

  /**
   * Use this method to send a log message with severity and source information
   * to the application's logger.
   *
   * If the application environment mode is [Production], the information will
   * be sent to a centralized repository.
   *
   * @param source
   * @param severity
   * @param message
   */
  log(source: string, severity: Severity, message: string, tags?: string[]) {
    this.source = `${this.applicationName}.${source}`;
    this.severity = severity;
    this.message = message;
    this.timestamp = new Date(Date.now());

    const logEntry = new LogEntry(this.applicationName, this.source, this.severity, this.message, tags);
    this.logEntries$.next(logEntry);
  }
}
