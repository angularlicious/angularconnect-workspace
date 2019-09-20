import { Component, OnInit } from '@angular/core';
import { Course, Video, Author } from '@angularlicious/lms-common';
import { Severity, LoggingService } from '@angularlicious/logging';
import { ComponentBase } from '@angularlicious/foundation';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesUIService } from '../courses-ui.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lms-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent extends ComponentBase implements OnInit {
  course: Course;
  courseId: string;

  showCourse$: Observable<boolean> = this.uiService.showCourse$.asObservable();
  public readonly videos$: Observable<Video[]> = this.uiService.videos$.asObservable();
  public readonly showVideos$: Observable<boolean> = this.uiService.showVideos$.asObservable();

  public readonly author$: Observable<Author> = this.uiService.author$;
  public readonly showAuthor$: Observable<boolean> = this.uiService.showAuthor$;

  constructor(private route: ActivatedRoute, private uiService: CoursesUIService, loggingService: LoggingService, router: Router) {
    super('CourseComponent', loggingService, router);
  }

  ngOnInit() {
    this.uiService.course$.subscribe(
      course => this.handleCourseUpdate(course),
      error => this.loggingService.log(this.componentName, Severity.Error, `Error while retrieving course. ${error.message}`),
      () => this.finishRequest(`Finished handling course update from ui service.`)
    );

    // https://angular.io/api/router/ActivatedRouteSnapshot)
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to retrieve video identifer.`);
    this.courseId = this.route.snapshot.params['id'];
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to retrieve video with identifier: ${this.courseId}`);
    this.uiService.retrieveCourse(this.courseId);
  }

  handleCourseUpdate(course: Course): void {
    if (course) {
      this.course = course;
    }
  }
}
