import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

const COMMA = 188;

/**
 * @title Chips with input
 */
@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css']
})
export class ChipsInputComponent {
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  myControl = new FormControl();
  filteredValues: Observable<any[]>;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  values = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];

constructor() {
  this.filteredValues = this.myControl.valueChanges
    .startWith(null)
    .map(state => state ? this.filterValues(state) : this.values.slice());
}

  filterValues(name: string) {
    return this.values.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.values.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.values.indexOf(fruit);

    if (index >= 0) {
      this.values.splice(index, 1);
    }
  }
}


