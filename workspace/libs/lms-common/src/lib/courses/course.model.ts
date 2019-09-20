import { Author } from '../authors/author.model';
import { CourseCategory } from './course-category.enum';
import { DocumentReference } from '@angular/fire/firestore';

export class Course {
  author: Author;
  authorId: any;
  category: CourseCategory = CourseCategory.Unknown;
  description: string;
  id: string;
  isPublished: boolean;
  title: string;
}
