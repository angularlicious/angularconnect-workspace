import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lms-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    throw new Error(`Test error using custom Error Handler.`);
  }
}
