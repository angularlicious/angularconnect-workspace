import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { AuthenticationService, AuthProviderDialog } from '@angularlicious/security';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { User } from '@angularlicious/lms-common';
import { Observable } from 'rxjs';

@Component({
  selector: 'lms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends ComponentBase implements OnInit {
  @Input() user: User;
  @Input() isAuthenticated: boolean;

  constructor(private authenticationService: AuthenticationService, public dialog: MatDialog, loggingService: LoggingService, router: Router) {
    super('LoginComponent', loggingService, router);
  }

  ngOnInit() {}

  login() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to load the provider(s) for authentication.`);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '400px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = { redirectUrl: '' };

    const dialogRef = this.dialog.open(AuthProviderDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.loggingService.log(this.componentName, Severity.Information, `${result}`, ['security']);
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
