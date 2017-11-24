import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent, MatAutocompleteSelectedEvent} from '@angular/material';
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

  chipsList = [];

  values = [{name: 'Java'}, {name: 'Javascript'}, {name: 'PHP'}];

constructor() {
  this.filteredValues = this.myControl.valueChanges
    .startWith(null)
    .map(state => state ? this.filterValues(state) : this.values.slice());
}

  filterValues(name: string) {
    return this.values.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  add(event: MatAutocompleteSelectedEvent): void {
    const input = event.option;
    const val = input.viewValue;

    if ((val || '').trim()) {
      this.chipsList.push({ name: val.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: any): void {
    const index = this.chipsList.indexOf(item);

    if (index >= 0) {
      this.chipsList.splice(index, 1);
    }
  }
}


