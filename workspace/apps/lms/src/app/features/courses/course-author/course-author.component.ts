import { Component, OnInit, Input } from '@angular/core';
import { Author } from '@angularlicious/lms-common';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'lms-course-author',
  templateUrl: './course-author.component.html',
  styleUrls: ['./course-author.component.css'],
})
export class CourseAuthorComponent extends ComponentBase implements OnInit {
  @Input() author: Author;

  constructor(loggingService: LoggingService, router: Router) {
    super('CourseAuthorComponent', loggingService, router);
  }

  ngOnInit() {
    this.loggingService.log(this.componentName, Severity.Information, `Initializing component: ${this.author.bio}`);
  }
}
