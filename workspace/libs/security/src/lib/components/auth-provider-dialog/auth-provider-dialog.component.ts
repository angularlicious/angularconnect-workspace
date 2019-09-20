import { Component, OnInit, Inject } from '@angular/core';
import { AuthProviderData } from '../../models/auth-provider-data.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../authentication.service';
import { ComponentBase } from '@angularlicious/foundation';
import { Router } from '@angular/router';
import { LoggingService } from '@angularlicious/logging';
import { Observable } from 'rxjs';

@Component({
  selector: 'angularlicious-auth-provider-dialog',
  templateUrl: './auth-provider-dialog.component.html',
  styleUrls: ['./auth-provider-dialog.component.scss'],
})
export class AuthProviderDialog extends ComponentBase implements OnInit {
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;

  constructor(
    public dialogRef: MatDialogRef<AuthProviderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AuthProviderData,
    private authService: AuthenticationService,
    router: Router,
    loggingService: LoggingService
  ) {
    super('AuthProviderDialogComponent', loggingService, router);
  }

  ngOnInit() {
    this.authService.userSubject.subscribe(
      userUpdate => this.handleUserUpdate(userUpdate),
      error => this.handleServiceErrors(error),
      () => this.finishRequest(`Finished handling changes to user/security.`)
    );
  }

  onNoClick(): void {
    // TODO: ADD RETURN OBJECT TO THE close() METHOD; RETURNS VALUE TO THE SUBSCRIBER;
    this.dialogRef.close();
  }

  handleUserUpdate(user) {
    if (user && this.authService.isAuthenticated) {
      this.onNoClick();
    } else {
      // do something here; NEED TO DISPLAY SOME ERROR MESSAGES HERE;
    }
  }

  signInWithGoogle() {
    return this.authService.googleLogin();
  }

  signInWithGithub() {
    return this.authService.githubLogin();
  }

  signInWithTwitter() {
    return this.authService.twitterLogin();
  }

  signInWithEmail() {
    return this.authService.emailLogin();
  }
}
