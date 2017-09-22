import {
    Component,
    Input,
    forwardRef,
    OnInit, OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

    constructor() {}

    ngOnInit() {}

    ngOnDestroy() {}

    public writeValue (value: any): void {}

    public registerOnChange (fn: any): void {}

    public registerOnTouched (fn: any): void {}
    
}
