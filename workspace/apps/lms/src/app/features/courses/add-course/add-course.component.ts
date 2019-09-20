import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CourseCategory, Course } from '@angularlicious/lms-common';
import { CoursesUIService } from '../courses-ui.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lms-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent extends ComponentBase implements OnInit {
  formGroup: FormGroup;
  categories = CourseCategory;

  // course$: Observable<Course> = this.courseUIService.course$.asObservable();

  constructor(private courseUIService: CoursesUIService, private formBuilder: FormBuilder, loggingService: LoggingService, router: Router) {
    super('AddCourseComponent', loggingService, router);
  }

  ngOnInit() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to initialize the [add] course form.`);
    this.formGroup = this.formBuilder.group({
      category: new FormControl(CourseCategory.Unknown, {
        validators: [Validators.required],
        updateOn: 'blur', // blur|change|submit (options);
      }),
      description: new FormControl(null, [Validators.required, Validators.maxLength(600)]),
      title: new FormControl(null, [Validators.required, Validators.maxLength(120)]),
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loggingService.log(this.componentName, Severity.Information, `The form is valid. Preparing to add new course.`);
      const course: Course = new Course();
      course.title = this.title.value;
      course.description = this.description.value;
      course.category = this.category.value;

      this.courseUIService.addCourse(course);
    }
  }

  get title() {
    return this.formGroup.get('title');
  }

  get description() {
    return this.formGroup.get('description');
  }

  get category() {
    return this.formGroup.get('category');
  }
}
