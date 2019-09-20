import { Injectable, Inject } from '@angular/core';
import { BusinessProviderBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';
import { FirestoreAuthorsRepositoryService } from './firestore-authors-repository.service';
import { RetrieveAuthorsAction } from './actions/retrieve-authors.action';
import { RetrieveAuthorAction } from './actions/retrieve-author.action';

/**
 * This is the coordinator of business operations for the core domain module. It will
 * compose business operations using one or more [Business Actions].
 */
@Injectable()
export class BusinessProviderService extends BusinessProviderBase {
  constructor(@Inject(FirestoreAuthorsRepositoryService) public apiService: FirestoreAuthorsRepositoryService, loggingService: LoggingService) {
    super('BusinessProviderService', loggingService);
  }

  retrieveAuthor<T>(authorId: string): Observable<T> {
    const action = new RetrieveAuthorAction<T>(authorId);
    action.Do(this);
    return action.response;
  }

  retrieveAuthors<T>(): Observable<T> {
    const action = new RetrieveAuthorsAction<T>();
    action.Do(this);
    return action.response;
  }
}
