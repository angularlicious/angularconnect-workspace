import { Observable } from 'rxjs';
import { ApiResponse } from '@angularlicious/foundation';

export interface IAuthorsRepository {
  retrieveLatestCourses<T>(): Observable<ApiResponse<T>>;
}
