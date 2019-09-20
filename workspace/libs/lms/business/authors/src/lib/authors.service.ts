import { Injectable, Inject } from '@angular/core';
import { BusinessProviderService } from './business/business-provider.service';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';

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
export class AuthorsService extends ServiceBase {
  constructor(@Inject(BusinessProviderService) private businessProvider: BusinessProviderService, loggingService: LoggingService) {
    super('AuthorsService', loggingService);

    this.initializeBusinessProvider(); //always provide the business the current [ServiceContext]cour
  }

  initializeBusinessProvider() {
    this.businessProvider.serviceContext = this.serviceContext;
  }

  retrieveAuthor<T>(authorId: string): Observable<T> {
    return this.businessProvider.retrieveAuthor<T>(authorId);
  }

  retrieveAuthors<T>(): Observable<T> {
    return this.businessProvider.retrieveAuthors<T>();
  }
}
