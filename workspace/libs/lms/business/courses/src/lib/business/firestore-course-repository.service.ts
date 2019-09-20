import { Injectable } from '@angular/core';
import { ServiceBase, SuccessApiResponse } from '@angularlicious/foundation';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Observable, from, of } from 'rxjs';
import { Course, Video } from '@angularlicious/lms-common';
import { map } from 'rxjs/operators';

@Injectable()
export class FirestoreCourseRepositoryService extends ServiceBase {
  private COURSES = 'courses';
  private VIDEOS = 'videos';

  private courseDocument: AngularFirestoreDocument<Course>;
  private course$: Observable<any> = new Observable<Course>(null);

  private courseCollection: AngularFirestoreCollection<Course>;
  private courses$: Observable<any> = new Observable<Course[]>(null);

  private videoCollection: AngularFirestoreCollection<Video>;
  private videos$: Observable<any> = new Observable<Video[]>(null);

  constructor(private firestore: AngularFirestore, loggingService: LoggingService) {
    super('FirestoreCourseRepositoryService', loggingService);
  }

  public addCourse<T>(course: Course): Observable<T> {
    this.courseCollection = this.firestore.collection<Course>(this.COURSES);
    this.courseCollection
      .add({ ...course })
      .then(response => {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process response to adding a new course to the database. ${course.title}`);
        if (response) {
          return this.retrieveCourse(response.id);
        }
      })
      .catch(error => this.handleError(error));
    return of(null);
  }

  public retrieveCourse<T>(courseId: string): Observable<T> {
    this.courseDocument = this.firestore.doc(`${this.COURSES}/${courseId}`);
    this.course$ = this.courseDocument.valueChanges();

    return this.course$;
  }

  public retrieveLatestCourses<T>(): Observable<T> {
    this.courseCollection = this.firestore.collection(this.COURSES);
    this.courses$ = this.courseCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(snapshot => {
          const data = snapshot.payload.doc.data();
          const id = snapshot.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.courses$;
  }

  public retrieveLatestCourseVideos<T>(course: Course): Observable<T> {
    this.videoCollection = this.firestore
      .collection(this.COURSES)
      .doc(course.id)
      .collection(this.VIDEOS);
    this.videos$ = this.videoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(snapshot => {
          const data = snapshot.payload.doc.data();
          const id = snapshot.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.videos$;
  }
}
