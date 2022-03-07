import {Component, Input, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent, MatAutocompleteSelectedEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {Languages} from '../../shared/languages';
import {Subscription} from "rxjs/Subscription";

const COMMA = 188;

/**
 * @title Chips with input
 */
@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css']
})
export class ChipsInputComponent  implements OnInit, OnDestroy {
  selectable = true;
  removable = true;
  addOnBlur = true;
  hidePanel = true;

  myControl = new FormControl();
  filteredValues: Observable<Languages[]>;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  @Input() values: Languages[];
  @Output() chips = new EventEmitter();
  value: string;
  chipsList = [];
  subscription: Subscription[] = [];

constructor() {}
ngOnInit() {
  this.subscription.push(this.myControl.valueChanges.subscribe(value => {
    this.value = value;
    if (this.value) {
      this.hidePanel = false;
    }
    console.log('Current value ', this.value);
  }));
  this.filteredValues = this.myControl.valueChanges
    .startWith(null)
    .map(state => state ? this.filterValues(state) : this.values.slice());
}
ngOnDestroy() {
  this.subscription.forEach(item => item.unsubscribe());
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
      this.values = this.values.filter(item => item.name !== val);
    }
    this.emmitChips();
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
      this.values.push(item);
    }
    this.emmitChips();
    this.value = '';
  }

  emmitChips(): void {
    this.chips.emit(this.chipsList);
  }
  onFocus() {
    if (!this.value) {
      this.hidePanel = true;
    }
  }
}

