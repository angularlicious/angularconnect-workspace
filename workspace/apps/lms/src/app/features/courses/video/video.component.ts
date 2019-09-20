import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { LoggingService, Severity } from '@angularlicious/logging';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesUIService } from '../courses-ui.service';
import { Observable } from 'rxjs';
import { Video } from '@angularlicious/lms-common';

@Component({
  selector: 'lms-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent extends ComponentBase implements OnInit {
  videoId: string;
  public readonly showVideo$: Observable<boolean> = this.uiService.showCourse$.asObservable();
  video: Video;

  constructor(private route: ActivatedRoute, private uiService: CoursesUIService, loggingService: LoggingService, router: Router) {
    super('VideoComponent', loggingService, router);
  }

  ngOnInit() {}
}
