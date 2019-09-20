import { Injectable } from '@angular/core';
import { ServiceBase, SuccessApiResponse } from '@angularlicious/foundation';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Observable, from } from 'rxjs';
import { Author } from '@angularlicious/lms-common';
import { map } from 'rxjs/operators';

@Injectable()
export class FirestoreAuthorsRepositoryService extends ServiceBase {
  private AUTHORS = 'authors';

  private authorDocument: AngularFirestoreDocument<Author>;
  private author$: Observable<any> = new Observable<Author>(null);

  private authorCollection: AngularFirestoreCollection<Author>;
  private authors$: Observable<any> = new Observable<Author[]>(null);

  constructor(private firestore: AngularFirestore, loggingService: LoggingService) {
    super('FirestoreAuthorRepositoryService', loggingService);
  }

  retrieveAuthor<T>(authorId: string): Observable<T> {
    this.authorDocument = this.firestore.doc(`${this.AUTHORS}/${authorId}`);
    this.author$ = this.authorDocument.valueChanges();

    return this.author$;
  }

  public retrieveAuthors<T>(): Observable<T> {
    this.authorCollection = this.firestore.collection(this.AUTHORS);
    this.authors$ = this.authorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(snapshot => {
          const data = snapshot.payload.doc.data();
          const id = snapshot.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.authors$;
  }
}
