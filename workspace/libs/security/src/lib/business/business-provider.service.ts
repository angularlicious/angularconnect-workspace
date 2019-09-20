import { Injectable, Inject } from '@angular/core';
import { BusinessProviderBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { FirestoreUsersRepositoryService } from './firestore-users-repository.service';
import { RetrieveUserAction } from './actions/retrieve-user.action';
import { RetrieveUsersAction } from './actions/retrieve-users.action';

/**
 * This is the coordinator of business operations for the core domain module. It will
 * compose business operations using one or more [Business Actions].
 */
@Injectable()
export class BusinessProviderService extends BusinessProviderBase {
  constructor(@Inject(FirestoreUsersRepositoryService) public apiService: FirestoreUsersRepositoryService, loggingService: LoggingService) {
    super('BusinessProviderService', loggingService);
  }

  retrieveUser<T>(authorId: string): Observable<T> {
    const action = new RetrieveUserAction<T>(authorId);
    action.Do(this);
    return action.response;
  }

  retrieveUsers<T>(): Observable<T> {
    const action = new RetrieveUsersAction<T>();
    action.Do(this);
    return action.response;
  }
}
