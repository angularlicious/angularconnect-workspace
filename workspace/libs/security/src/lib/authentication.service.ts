import { Injectable } from '@angular/core';
import { ServiceBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { from, Subject, ReplaySubject, Observable } from 'rxjs';
import { User } from '@angularlicious/lms-common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends ServiceBase {
  private user: User;
  userSubject: Subject<User> = new ReplaySubject<User>(1);
  public readonly user$: Observable<User> = this.userSubject.asObservable();

  isAuthenticated: boolean;
  private isAuthenticatedSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public readonly isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(loggingService: LoggingService, private auth: AngularFireAuth, private firestore: AngularFirestore) {
    super('AuthenticationService', loggingService);
    this.serviceName = 'AuthService';

    this.initializeFirebase();

    auth.authState.subscribe(authState => this.handleAuthState(authState), error => console.log(error));
  }

  initializeFirebase() {
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
  }

  handleAuthState(authState: firebase.User): void {
    if (authState) {
      this.firestore
        .doc<User>(`users/${authState.uid}`)
        .valueChanges()
        .subscribe(user => this.handleUserValueChanges(user), error => this.handleError(error), () => `Finished handling user changes.`);
    }
  }

  handleUserValueChanges(user: User) {
    if (user) {
      this.user = user;
      this.isAuthenticated = true;

      // publish changes to user/authentication;
      this.userSubject.next(this.user);
      this.isAuthenticatedSubject.next(true);
    } else {
      this.user = null;
      this.isAuthenticated = false;

      // publish changes to user/authentication;
      this.userSubject.next(this.user);
      this.isAuthenticatedSubject.next(false);
    }
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailLogin() {
    const provider = new firebase.auth.EmailAuthProvider();
    return this.oAuthLogin(provider);
  }

  logout() {
    //TODO: NEED TO HANDLE REDIRECT TO THE HOME/INDEX OR OTHER DEFINED PAGE;
    return this.oAuthLogout();
  }

  private oAuthLogin(provider) {
    from(this.auth.auth.signInWithPopup(provider)).subscribe(
      credential => this.handleSignInResponse(credential),
      error => this.handleError(error),
      () => this.loggingService.log(this.serviceName, Severity.Information, `Finished handling response from ${provider} provider.`)
    );
  }

  private oAuthLogout() {
    from(this.auth.auth.signOut()).subscribe(
      result => this.handleSignOutResponse(result),
      error => this.handleError(error),
      () => this.loggingService.log(this.serviceName, Severity.Information, `Finished handling process of logging out.`)
    );
  }

  private updateUser(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data = {
      ...user,
    };

    userRef.set(data);
  }

  private handleSignInResponse(credential) {
    if (credential) {
      try {
        this.updateUser(credential.user);
        this.isAuthenticated = true;
        this.isAuthenticatedSubject.next(true);
        this.userSubject.next(credential.user);
      } catch (error) {
        this.loggingService.log(this.serviceName, Severity.Error, `handleSignInResponse: ${error}`);
        this.handleError(error);
      }
    }
  }

  private handleSignOutResponse(result: any) {
    this.user = null;
    this.isAuthenticated = false;
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(this.user);
  }
}
