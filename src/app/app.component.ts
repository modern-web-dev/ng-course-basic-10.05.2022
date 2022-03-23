import { Component } from '@angular/core';
import {SpinnerService} from "./shared/service/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'This is our demo app';
  counter = 0;

  constructor(public readonly spinnerService: SpinnerService) {
  }
}
