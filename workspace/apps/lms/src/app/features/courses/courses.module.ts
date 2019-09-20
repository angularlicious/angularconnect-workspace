import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CoursesUIService } from './courses-ui.service';
import { LmsBusinessCoursesModule, CoursesService } from '@angularlicious/lms/business/courses';
import { VideoComponent } from './video/video.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseComponent } from './course/course.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CourseAuthorComponent } from './course-author/course-author.component';
import { AuthorsService, LmsBusinessAuthorsModule } from '@angularlicious/lms/business/authors';
import { UserService, SecurityModule } from '@angularlicious/security';

@NgModule({
  declarations: [
    AddCourseComponent,
    LatestCoursesComponent,
    CourseCardComponent,
    VideoComponent,
    VideoPlayerComponent,
    CourseComponent,
    CourseDetailsComponent,
    MyCoursesComponent,
    CourseAuthorComponent,
  ],
  exports: [LatestCoursesComponent],
  imports: [CommonModule, CoursesRoutingModule, LmsBusinessAuthorsModule, LmsBusinessCoursesModule, SecurityModule, ReactiveFormsModule, FormsModule, SharedModule],
  providers: [CoursesUIService, AuthorsService, CoursesService, UserService],
})
export class CoursesModule {}
