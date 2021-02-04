import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chip-input-dropdown',
  templateUrl: './chip-input-dropdown.component.html',
  styleUrls: ['./chip-input-dropdown.component.css']
})
export class ChipInputDropdownComponent implements OnInit {
  @Input() searchValues$: Observable<string[]>;
  @Output() selected = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addItem(item: string): void {
    this.selected.emit(item);
  }

}
