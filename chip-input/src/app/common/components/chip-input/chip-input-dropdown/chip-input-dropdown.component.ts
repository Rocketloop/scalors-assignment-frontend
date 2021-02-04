import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-chip-input-dropdown',
  templateUrl: './chip-input-dropdown.component.html',
  styleUrls: ['./chip-input-dropdown.component.css']
})
export class ChipInputDropdownComponent implements OnInit {
  @Input() set searchValues$(obs: Observable<string[]>) {
    if (obs) {
      this.searchValuesInner$ = obs.pipe(
        tap(val => {
          this.items = val;
          this.selectedIndex = -1;
        })
      );
    }
  }
  get searchValues$(): Observable<string[]> {
    return this.searchValuesInner$;
  }
  @Output() selected = new EventEmitter();
  selectedIndex = -1;
  items = [];
  private searchValuesInner$: Observable<string[]>;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (!this.items || !this.items.length) {
      return;
    }
    if (event.keyCode === KEY_CODE.DOWN_ARROW && this.selectedIndex < this.items.length - 1){
      this.selectedIndex++;
    }
    if (event.keyCode === KEY_CODE.UP_ARROW && this.selectedIndex > 0){
      this.selectedIndex--;
    }
    if (event.keyCode === KEY_CODE.ENTER && this.selectedIndex >= 0) {
      this.addItem(this.items[this.selectedIndex]);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  addItem(item: string): void {
    this.selected.emit(item);
  }

}

export enum KEY_CODE {
  ENTER = 13,
  UP_ARROW = 38,
  DOWN_ARROW = 40
}
