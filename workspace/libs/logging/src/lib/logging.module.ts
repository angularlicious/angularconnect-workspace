import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLogglyModule } from 'ngx-loggly-logger';

@NgModule({
  imports: [CommonModule, NgxLogglyModule.forRoot()],
  providers: [],
})
export class LoggingModule {}
