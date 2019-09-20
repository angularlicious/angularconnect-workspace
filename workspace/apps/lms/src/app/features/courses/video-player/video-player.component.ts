import { Component, OnInit, Input } from '@angular/core';
import { Video } from '@angularlicious/lms-common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'lms-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent extends ComponentBase implements OnInit {
  @Input() video: Video;
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, loggingService: LoggingService, router: Router) {
    super('VideoPlayerComponent', loggingService, router);
  }

  ngOnInit() {
    if (this.video && this.video.id) {
      this.loggingService.log(this.componentName, Severity.Information, `Video input is valid for course: ${this.video.title}`);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
    } else {
      this.loggingService.log(this.componentName, Severity.Error, `The video course input is not valid. Cannot load course video.`);
    }
  }
}
