import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { COMMA } from '@angular/cdk/keycodes';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ChipsComponent,
            multi: true
        }
    ]
})

export class ChipsComponent implements ControlValueAccessor, OnInit {
    @Input() values = [];
    @Input() basicLanguages: string[] = [];
    @ViewChild('languageInput') languageInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    value: any;
    seperator: number[] = [COMMA];

    formControl = new FormControl();
    filteredOptions: Observable<string[]>;

    onTouched: () => void;
    onChange: (value: any) => void = () => { };

    constructor() { }

    ngOnInit() {
        this.filteredOptions = this.formControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onKeyup(event) {
        if (event.key && (event.key as string).toLowerCase() == 'enter' && this.value) {
            const values = [...this.values, ...[this.value]];
            this.onChange(values);
            this.languageInput.nativeElement.value = '';
            this.value = '';
        }
    }

    remove(language: string): void {
        const index = this.values.indexOf(language);
        if (index >= 0) {
            this.values.splice(index, 1);
            this.onChange(this.values);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.values.push(event.option.viewValue);
        this.onChange(this.values);
        this.languageInput.nativeElement.value = '';
        this.value = '';
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.basicLanguages.filter(value => value.toLowerCase().indexOf(filterValue) === 0);
    }
}
