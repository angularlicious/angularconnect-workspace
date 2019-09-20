import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthProviderDialog } from './components/auth-provider-dialog/auth-provider-dialog.component';
import { BusinessProviderService } from './business/business-provider.service';
import { FirestoreUsersRepositoryService } from './business/firestore-users-repository.service';
import { HttpService } from '@angularlicious/http-service';

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
  declarations: [AuthProviderDialog],
  exports: [AuthProviderDialog],
  entryComponents: [AuthProviderDialog],
  providers: [BusinessProviderService, FirestoreUsersRepositoryService, HttpService],
})
export class SecurityModule {}
