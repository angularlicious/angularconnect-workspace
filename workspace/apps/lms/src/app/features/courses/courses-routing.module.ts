import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseComponent } from './course/course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [
  {
    path: '',
    component: LatestCoursesComponent,
  },
  {
    path: 'courses/course/:id',
    component: CourseComponent,
  },
  {
    path: 'courses/add-course',
    component: AddCourseComponent,
  },
  {
    path: 'courses/course-details/:id',
    component: CourseDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
