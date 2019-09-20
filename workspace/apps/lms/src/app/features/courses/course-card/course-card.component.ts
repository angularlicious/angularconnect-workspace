import { Component, OnInit, Input } from '@angular/core';
import { Course } from '@angularlicious/lms-common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'lms-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent extends ComponentBase implements OnInit {
  @Input() course: Course;
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, loggingService: LoggingService, router: Router) {
    super('CourseCardComponent', loggingService, router);
  }

  ngOnInit() {}
}
