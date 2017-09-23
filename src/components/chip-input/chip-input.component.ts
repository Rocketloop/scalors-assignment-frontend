import {
    Component,
    Input,
    ViewChild,
    forwardRef, ElementRef,
    OnInit, OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

enum Key {
    Back    = 8,
    Tab     = 9,
    Enter   = 13,
    Esc     = 27,
    Left    = 37,
    Up      = 38,
    Right   = 39,
    Down    = 40
}

@Component({
    selector: 'chip-input',
    templateUrl: './chip-input.component.html',
    styleUrls: ['./chip-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ChipInputComponent),
        multi: true
    }]
})
export class ChipInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() public typeahead = Observable.of([]);
    @ViewChild('suggestionList') suggestionList: ElementRef;

    public propagateChange = (_: any) => {};

    public selectedItems: string[] = [
        'Go','Java', 'Dart',
        'JavaScript', 'TypeScript',
        'Perl', 'PHP', 'Anglar',
        'Lisp', 'Clojure',
        'Brainfuck', 'Haskel'
    ];

    constructor() {}

    ngOnInit() {}

    ngOnDestroy() {}

    public removeItem(index: number) {
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }
    }
    private _onChange = (_: any) => {};

    public writeValue (e: KeyboardEvent): void {
        if (e.keyCode === Key.Back && this.suggestionList.nativeElement.value == '') {
            this.removeItem(this.selectedItems.length - 1);
            this._onChange(this.selectedItems);
        }
        if (e.keyCode === Key.Enter && this.suggestionList.nativeElement.value !== '') {
            this.selectedItems.push(this.suggestionList.nativeElement.value);
            this.suggestionList.nativeElement.value = '';
            this._onChange(this.selectedItems);
        }
    }

    public registerOnChange (fn: any ): void {
        this._onChange = fn;
    }

    public registerOnTouched (fn: any): void {}
}
