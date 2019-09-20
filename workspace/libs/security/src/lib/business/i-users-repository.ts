import { Observable } from 'rxjs';
import { ApiResponse } from '@angularlicious/foundation';

export interface IUsersRepository {
  retrieveLatestCourses<T>(): Observable<ApiResponse<T>>;
}
