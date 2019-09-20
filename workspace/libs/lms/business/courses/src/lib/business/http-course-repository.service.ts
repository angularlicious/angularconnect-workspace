import { Injectable, Inject } from '@angular/core';
import { ServiceBase, ApiResponse, SuccessApiResponse } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@angularlicious/http-service';
import { Course, Author, CourseCategory } from '@angularlicious/lms-common';
import { ICoursesRepository } from './i-courses-repository';

@Injectable()
export class HttpCourseRepositoryService extends ServiceBase implements ICoursesRepository {
  baseUrl = 'http://mybackend.com/api/'; //@@TODO: USE CONFIGURATION HERE;
  noCredentials = false;
  credentialsRequired = true;

  constructor(@Inject(HttpClient) public http: HttpClient, @Inject(HttpService) public httpService: HttpService, loggingService: LoggingService) {
    super('HttpCourseRepositoryService', loggingService);
  }

  retrieveLatestCourses<T>(): Observable<ApiResponse<T>> {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to execute the API call for the latest video courses.`);
    const courses: Course[] = [];

    const course = new Course();
    course.author = new Author();
    course.author.bio = 'Loves tacos, jazz, and Angular. Building enterprise applications using CLEAN principles and patterns.';
    course.category = CourseCategory.Angular;
    course.description =
      'A short video to reintroduce you to the game changing capabilities of the Angular Workspace. If you or your team needs to be better at sharing and reusing code - then this is for you';
    course.id = '11111111';
    course.title = 'Angular Workspace Reintroduction';
    courses.push(course);

    const course2 = new Course();
    course2.author = new Author();
    course2.author.bio = 'Loves tacos, jazz, and Angular. Building enterprise applications using CLEAN principles and patterns.';
    course2.category = CourseCategory.Angular;
    course2.description =
      'Learn how to use the Angular `DevKit` to create custom schematics that will generate and update code for your Angular applications. Schematics provides the mechanism for enhanced developer workflow that includes consistency and convention. It is the power behind the Angular CLI.';
    course2.id = '22222222222';
    course2.title = 'Angular Schematics for a Better Workflow';
    courses.push(course2);

    const course3 = new Course();
    course3.author = new Author();
    course3.author.bio = 'Loves tacos, jazz, and Angular. Building enterprise applications using CLEAN principles and patterns.';
    course3.category = CourseCategory.Angular;
    course3.description =
      'A short video to reintroduce you to the game changing capabilities of the Angular Workspace. If you or your team needs to be better at sharing and reusing code - then this is for you';
    course3.id = '3333333333';
    course3.title = 'Angular Workspace Reintroduction';
    courses.push(course3);

    const apiResponse = new SuccessApiResponse();
    apiResponse.Data = courses;
    apiResponse.IsSuccess = true;
    apiResponse.Message = `Successfully retrieved latest video courses.`;
    apiResponse.Timestamp = new Date(Date.now());

    return of(apiResponse);

    // const requestUrl = this.baseUrl.concat('courses/latest');
    // const options = this.httpService.createOptions(HttpRequestMethod.get, this.httpService.createHeader(), requestUrl, null, this.noCredentials);
    // return this.httpService.execute<T>(options);
  }
}
