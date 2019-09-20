import { Course } from './course.model';

/**
 * Use to define data for a video course.
 *
 * Note: use to get image url: http://www.get-youtube-thumbnail.com/
 */
export class VideoCourse extends Course {
  videoUrl: string;
  videoImageUrl: string;
}
