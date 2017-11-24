import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent, MatAutocompleteSelectedEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {Languages} from '../../shared/languages';

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
  filteredValues: Observable<Languages[]>;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  @Input() values: Languages[];

  chipsList = [];

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
  }

  clear(event: MatChipInputEvent) {
  if (event.input) {
    event.input.value = '';
    }
  }

  remove(item: Languages): void {
    const index = this.chipsList.indexOf(item);

    if (index >= 0) {
      this.chipsList.splice(index, 1);
    }
  }
}

