import { Injectable, Optional } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { IConfiguration } from './i-configuration';
import { ConfigurationContext } from './configuration-context';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private settings: Subject<IConfiguration> = new ReplaySubject<IConfiguration>(1);
  public readonly settings$: Observable<IConfiguration> = this.settings.asObservable();

  constructor(@Optional() context: ConfigurationContext) {
    if (context) {
      this.settings.next(context.config);
    }
  }
}
