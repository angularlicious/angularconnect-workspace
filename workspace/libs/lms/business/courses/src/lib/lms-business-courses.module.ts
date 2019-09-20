import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '@angularlicious/http-service';
import { BusinessProviderService } from './business/business-provider.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreCourseRepositoryService } from './business/firestore-course-repository.service';

const firebaseOptions = {
  apiKey: 'YOUR API KEY HERE',
  authDomain: 'AUTHORIZED DOMAIN',
  databaseURL: 'DATABASE URL HERE',
  projectId: 'YOUR PROJECT NAME HERE',
  storageBucket: 'STORAGE BUCKET URL HERE',
  messagingSenderId: '',
};

@NgModule({
  imports: [CommonModule, AngularFireModule.initializeApp(firebaseOptions), AngularFireAuthModule, AngularFirestoreModule],
  exports: [],
  providers: [BusinessProviderService, FirestoreCourseRepositoryService, HttpService],
})
export class LmsBusinessCoursesModule {}
