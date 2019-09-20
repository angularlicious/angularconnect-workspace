import { Observable } from 'rxjs';
import { ApiResponse } from '@angularlicious/foundation';

export interface ICoursesRepository {
  retrieveLatestCourses<T>(): Observable<ApiResponse<T>>;
}
