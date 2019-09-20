import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Course, Video, Author, User } from '@angularlicious/lms-common';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';

import { CoursesService } from '@angularlicious/lms/business/courses';
import { AuthorsService } from '@angularlicious/lms/business/authors';
import { Router } from '@angular/router';
import { UserService } from '@angularlicious/security';

/**
 * Use this service as a mediator between feature module components and the core domain
 * service(s) of the application. This service has the responsibility to support
 * the components in the feature module for state management.
 *
 * It will coordinate the calls to the application's core domain service - the
 * [CoursesService]. The [CoursesService] is a member of the application's core
 * domain module [Courses] - this module implements the core business logic
 * for the domain feature.
 *
 * This service is provided in the feature module. The access is scoped
 * for use by members within the feature module only.
 */
@Injectable()
export class CoursesUIService extends ServiceBase {
  // use to manage state for the [course] collection and item(s);
  private courses: Course[] = [];
  private course: Course;
  private authors: Author[] = [];
  private author: Author;

  // setup for a [Course] Observable
  private courseSubject: BehaviorSubject<Course> = new BehaviorSubject<Course>(null);
  course$: Observable<Course> = this.courseSubject.asObservable();
  showCourse$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // setup for [Course] collection Observable
  latestCoursesSubscription: Subscription;
  latestCourses$: ReplaySubject<Course[]> = new ReplaySubject<Course[]>(1);
  showCourses$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  // setup for [Video] collection Observable
  videos$: ReplaySubject<Video[]> = new ReplaySubject<Video[]>(1);
  showVideos$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // setup for [Author] Observable
  public authorSubject: ReplaySubject<Author> = new ReplaySubject<Author>(1);
  public readonly author$: Observable<Author> = this.authorSubject.asObservable();
  private showAuthorSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public readonly showAuthor$: Observable<boolean> = this.showAuthorSubject.asObservable();

  constructor(
    private userService: UserService,
    private coursesService: CoursesService,
    private authorsService: AuthorsService,
    private router: Router,
    loggingService: LoggingService
  ) {
    super('CoursesUIService', loggingService);
    this.initialize();
  }

  /**
   * Use to add a new course for the specified author.
   * @param course
   */
  public addCourse(course: Course) {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to call the [Course] Service to process request to add new course.`);

    this.coursesService
      .addCourse<Course>(course)
      .subscribe(response => this.handleAddCourseResponse(response), error => this.handleError(error), () => this.finishRequest(`Finished request to add new course.`));
  }

  /**
   * Use to retrieve a video from the collection.
   * @param courseId
   */
  public retrieveCourse(courseId: string) {
    this.loggingService.log(this.serviceName, Severity.Information, `Setting [showCourse$] to [false]`);
    this.showCourse$.next(false);

    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to find course in collection.`);
    const targetCourse = this.courses.find(item => item.id === courseId);
    if (targetCourse) {
      this.loggingService.log(this.serviceName, Severity.Information, `Target course found: ${targetCourse.title}.`);
      this.showCourse$.next(true);
      this.courseSubject.next(targetCourse);
      this.course = targetCourse;

      this.retrieveCourseVideos(this.course);
      this.retrieveCourseAuthor(this.course);
    }
  }

  private initialize() {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to initialize the [UI] observables.`);
    this.showCourses$.next(false);
    this.showCourse$.next(false);

    this.coursesService.retrieveLatestCourses<Course[]>().subscribe(
      response => this.handleLatestCoursesResponse<Observable<Course[]>>(response),
      error => this.handleError(error),
      () => {
        this.finishRequest(`Finished request for latest video courses.`);
      }
    );
  }

  private retrieveCourseAuthor(course: Course) {
    // use author service in the author core/domain service;
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to retrieve course [author] information.`);

    this.authorsService
      .retrieveAuthor<Author>(course.authorId.id)
      .subscribe(
        response => this.handleRetrieveAuthorResponse(response),
        error => this.handleError(error),
        () => this.finishRequest(`Finished handling request for author information.`)
      );
  }

  private retrieveCourseVideos(course: Course) {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to retrieve course videos.`);
    this.coursesService
      .retrieveCourseVideos<Video[]>(course)
      .subscribe(response => this.handleCourseVideosResponse(response), error => this.handleError(error), () => this.finishRequest(`Finished request for course videos.`));
  }

  /**
   * A helper method to retrieve the aggregate members of the [current] author.
   */
  private retrieveAuthorDetails() {
    // retrieve user information for the specified author;
    this.userService
      .retrieveUser<User>(this.author.userId)
      .subscribe(response => this.handleUserResponse(response), error => this.handleError(error), () => this.finishRequest(`Finished request for author user information.`));
  }

  /**
   * Use to handle the response for the author's user information.
   * @param response
   */
  private handleUserResponse(response: User): void {
    if (response) {
      this.author.user = response;
      this.showAuthorSubject.next(true);
      this.authorSubject.next(this.author);
    }
  }

  private handleRetrieveAuthorResponse(response: Author): void {
    if (response) {
      this.author = response;
      this.authorSubject.next(this.author);
      this.showAuthorSubject.next(true);
      this.retrieveAuthorDetails();
    } else {
      this.authorSubject.next(null);
      this.author = null;
      this.showAuthorSubject.next(false);
    }
  }

  private handleAddCourseResponse(response: Course): void {
    if (response) {
      this.loggingService.log(this.serviceName, Severity.Information, `Handling successful l response for adding new course.`);
      this.courseSubject.next(response);
      this.showCourse$.next(true);
      this.course = response;

      //redirect user to the course details page; to finish configuration of course;
      this.router.navigate(['courses/course-detail', this.course.id]);
    } else {
      this.loggingService.log(this.serviceName, Severity.Warning, `Failed to get a valid response for the [add course] request.`);
      this.courseSubject.next(null);
      this.showCourse$.next(false);
      this.course = null;
    }
  }

  private handleCourseVideosResponse(response: Video[]): void {
    if (response && response.length > 0) {
      this.videos$.next(response);
      this.showVideos$.next(true);
    } else {
      this.showVideos$.next(false);
    }
  }

  /**
   * Use to handle the response for the latest courses request.
   * @param response
   */
  private handleLatestCoursesResponse<T>(response: Course[]): void {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to handle request for latest videos.`);
    if (response && response.length > 0) {
      this.loggingService.log(this.serviceName, Severity.Information, `Processing valid response with [${response.length}] videos.`);
      this.courses = response;
      this.latestCourses$.next(this.courses);
      this.showCourses$.next(true);
    } else {
      this.loggingService.log(this.serviceName, Severity.Warning, `The response does not contain any videos.`);
      this.showCourses$.next(false);
      this.latestCourses$.next([]);
    }
  }
}
