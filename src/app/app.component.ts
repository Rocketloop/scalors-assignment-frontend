import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages = [{
    name: 'Java'
  }, {
    name: 'Javascript'
  }, {
    name: 'Go lang'
  }, {
    name: 'C++'
  }, {
    name: 'PHP'
  }, {
    name: 'Ruby'
  }, {
    name: 'Objective-C'
  }];
}
