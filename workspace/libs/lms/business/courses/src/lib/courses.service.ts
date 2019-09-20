import { Injectable, Inject } from '@angular/core';
import { ServiceBase, ApiResponse } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { BusinessProviderService } from './business/business-provider.service';
import { Course } from '@angularlicious/lms-common';

/**
 * The [CoursesService] is a member of the core domain business logic implementation
 * for [Courses]. It provides the API for all course domain operations. The domain
 * module is for business logic implementation only.
 *
 * Note: there are no UI concerns in this module or service.
 *
 * This service is provided at the scope of a feature module within the application. This
 * service has a dependency on the [BusinessProviderService] - which is internal and scoped
 * to the business domain module. The [LmsBusinessCoursesModule] provides this service and
 * all other internal/dependency services for the business domain implementation.
 */
@Injectable()
export class CoursesService extends ServiceBase {
  constructor(@Inject(BusinessProviderService) private businessProvider: BusinessProviderService, loggingService: LoggingService) {
    super('CoursesService', loggingService);

    this.initializeBusinessProvider();
  }

  initializeBusinessProvider() {
    this.businessProvider.serviceContext = this.serviceContext;
  }

  addCourse<T>(course: Course): Observable<T> {
    return this.businessProvider.addCourse<T>(course);
  }

  retrieveLatestCourses<T>(): Observable<T> {
    return this.businessProvider.retrieveLatestCourses<T>();
  }

  /**
   * Use to retrieve the aggregate videos for the specified course.
   * @param course
   */
  retrieveCourseVideos<T>(course: Course): Observable<T> {
    return this.businessProvider.retrieveCourseVideos<T>(course);
  }
}
