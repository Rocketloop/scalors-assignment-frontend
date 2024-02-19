import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'scalors-assignment-frontend';
  form: FormGroup;
  languages: string[] = ['Angular'];
  basicLanguages: string[] = ['Angular', 'JavaScript', 'TypeScript', 'Java', 'C#'];

  ngOnInit() {
    this.form = new FormGroup({
      chip: new FormControl()
    });
  }

  changed($event): void {
    if ($event.key && $event.key.toLowerCase() == 'enter') {
      this.languages = this.form.controls.chip.value;
    }
  }
}
