import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService } from '@angularlicious/logging';
import { Router } from '@angular/router';
import { AuthenticationService } from '@angularlicious/security';
import { User } from '@angularlicious/lms-common';

@Component({
  selector: 'lms-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css'],
})
export class UserImageComponent extends ComponentBase implements OnInit {
  @Input() user: User;
  @Input() isAuthenticated: boolean;

  constructor(private authService: AuthenticationService, loggingService: LoggingService, router: Router) {
    super('UserImageComponent', loggingService, router);
  }

  ngOnInit() {}
}
