import {
    Component,
    Input,
    ViewChild,
    forwardRef, ElementRef,
    OnInit, OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

enum Key {
    Tab     = 9,
    Enter   = 13,
    Esc     = 27,
    Left    = 37,
    Up      = 38,
    Right   = 39,
    Down    = 40
}

@Component({
    selector: 'app-chip-input',
    templateUrl: './chip-input.component.html',
    styleUrls: ['./chip-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ChipInputComponent),
        multi: true
    }]
})
export class ChipInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() public typeahead: Observable<string[]> = Observable.of([]);
    @ViewChild('hiddenInput') public hiddenInput: ElementRef;
    @ViewChild('suggestionTpl') public suggestionTpl: ElementRef;

    public selectedItems: string[] = [];
    public suggestionList: string[] = [];
    public showSuggestions = false;

    private subscrPool: Subscription[];
    private selectedIndex = 0;
    private _onChange = (_: any) => {};

    constructor() {}

    ngOnInit() {
        const keyup = Observable.fromEvent(this.hiddenInput.nativeElement, 'keyup').share();
        this.subscrPool = [
            this.findSuggestion(keyup),
            this.controlDeletion(),
            this.keyboardNavigate(keyup),
            this.filterEnter(keyup)
        ];
    }

    ngOnDestroy() {
        this.subscrPool.forEach( sub => sub.unsubscribe() );
        this.subscrPool.length = 0;
    }

    public writeValue (value: string): void {
        if (value !== '' && this.selectedItems.indexOf(value) < 0) {
            this.selectedItems.push(value);
            this._onChange(this.selectedItems);
        }
        this.hiddenInput.nativeElement.value = '';
        this.selectedIndex = 0;
        this.suggestionList = [];
    }

    public registerOnChange (fn: any ): void {
        this._onChange = fn;
    }

    public registerOnTouched (fn: any): void {}

    public removeItem(index: number) {
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }
    }

    public markActive(index: number) {
        return (index === this.selectedIndex);
    }

    private findSuggestion(keyObj: Observable<{}>) {
        return keyObj.filter((e: any) => this.filterNonCharKey(e.keyCode))
            .map((e: any) => e.target.value )
            .debounceTime(350)
            .concat()
            .filter((q: string) => q.length > 0)
            .switchMap((q: string) => this.findInArray(q))
            .subscribe( (results: string[]) => {
                this.suggestionList = results;
                this.showSuggestions = true;
                this.selectedIndex = 0;
            });
    }

    private controlDeletion() {
        const keyDown = Observable.fromEvent(this.hiddenInput.nativeElement, 'keydown').share();
        return keyDown.filter((e: any) => e.keyCode === 8) // handle backspace
            .subscribe( (ev: Event) => {
                if (this.hiddenInput.nativeElement.value === '' && this.selectedItems.length > 0) {
                    this.removeItem(this.selectedItems.length - 1);
                }
            });
    }

    private keyboardNavigate(keyObj: Observable<{}>) {
        return keyObj.filter((e: any) => (e.keyCode === Key.Up || e.keyCode === Key.Down))
            .map( (e: any) => e.keyCode)
            .subscribe( kCode => {
                if (this.suggestionList.length > 0) {
                    if ( kCode === Key.Up && this.selectedIndex > 0 ) { this.selectedIndex--; }
                    if ( (kCode === Key.Down || kCode === Key.Tab) && (this.selectedIndex < this.suggestionList.length - 1) ) {
                        this.selectedIndex++;
                    }
                }
            });
    }

    private filterEnter(keyObj: Observable<{}>) {
        return keyObj.filter((e: any) => e.keyCode === Key.Enter)
            .subscribe((ev: Event) => {
                ev.preventDefault();
                if (this.suggestionList.length > 0) {
                    this.writeValue(this.suggestionList[this.selectedIndex]);
                }
            });
    }

    private findInArray(query: string): Observable<string[]> {
        const regexp = new RegExp(query, 'ig');
        return this.typeahead.map(item => item.filter((el: string) => { return regexp.test(el); }));
    }

    private filterNonCharKey(keyCode: number): boolean {
        return Object.keys(Key).map(k => Key[k]).every( kCode => kCode !== keyCode );
    }
}
