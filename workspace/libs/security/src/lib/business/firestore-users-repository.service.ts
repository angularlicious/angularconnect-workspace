import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Observable, from } from 'rxjs';
import { User } from '@angularlicious/lms-common';
import { map } from 'rxjs/operators';

@Injectable()
export class FirestoreUsersRepositoryService extends ServiceBase {
  private USERS = 'users';

  private userDocument: AngularFirestoreDocument<User>;
  private user$: Observable<any> = new Observable<User>(null);

  private userCollection: AngularFirestoreCollection<User>;
  private users$: Observable<any> = new Observable<User[]>(null);

  constructor(private firestore: AngularFirestore, loggingService: LoggingService) {
    super('FirestoreUserRepositoryService', loggingService);
  }

  /**
   * Uses the reference document identifer to retrieve the specific [user] doc.
   * @param userId
   */
  retrieveUser<T>(userId: any): Observable<T> {
    this.userDocument = this.firestore.doc(`${this.USERS}/${userId.id}`);
    this.user$ = this.userDocument.valueChanges();

    return this.user$;
  }

  public retrieveUsers<T>(): Observable<T> {
    this.userCollection = this.firestore.collection(this.USERS);
    this.users$ = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(snapshot => {
          const data = snapshot.payload.doc.data();
          const id = snapshot.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.users$;
  }
}
