import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent implements OnInit {
  @Input() value: string;
  @Output() remove = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  removeItem(): void {
    this.remove.emit(this.value);
  }

}
