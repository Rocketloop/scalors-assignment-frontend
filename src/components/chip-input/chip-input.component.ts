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
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

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
    @Input() public typeahead: any[] = [];
    @ViewChild('hiddenInput') public hiddenInput: ElementRef;
    @ViewChild('suggestionTpl') public suggestionTpl: ElementRef;

    public selectedItems: string[] = [];
    public suggestionList: string[] = [];
    public showSuggestions: boolean = false;

    private _onChange = (_: any) => {};
    private subscrPool: Subscription[];

    constructor() {}

    ngOnInit() {
        //const keyDown = Observable.fromEvent(this.hiddenInput.nativeElement, 'keydown').publish();
        const keyDown = this.onElementKeyDown();
        this.subscrPool = [
            this.findSuggestion(keyDown)
        ];
    }

    ngOnDestroy() {
        this.subscrPool.forEach( sub => sub.unsubscribe() );
        this.subscrPool.length = 0;
    }

    public writeValue (e: KeyboardEvent): void {
        /*
        if (e.keyCode === Key.Back && this.hiddenInput.nativeElement.value == '') {
            this.removeItem(this.selectedItems.length - 1);
            this._onChange(this.selectedItems);
        }
        if (e.keyCode === Key.Enter && this.hiddenInput.nativeElement.value !== '') {
            this.selectedItems.push(this.hiddenInput.nativeElement.value);
            this.hiddenInput.nativeElement.value = '';
            this._onChange(this.selectedItems);
        }
        */
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

    onElementKeyDown() {
        return Observable.fromEvent(this.hiddenInput.nativeElement, 'keyup').share();
    }

    public findSuggestion(keyObj: Observable<{}>) {
        return keyObj.filter((e: any) => this.filterNonCharKey(e.keyCode))
            .map((e: any) => e.target.value )
            .debounceTime(350)
            .concat()
            .distinctUntilChanged()
            .filter((q: string) => q.length > 0)
            .switchMap((q: string) => this.findInArray(q))
            .subscribe( (results: string[]) => {
                console.log(results);
                this.suggestionList = results;
                this.showSuggestions = true;
            });
    }

    private findInArray(query: string): Observable<string[]> {
        let regexp = new RegExp(query, 'ig');
        return this.typeahead.map(item => item.filter((el: string) => { return regexp.test(el); }));
    }

    private filterNonCharKey(keyCode: number): boolean {
        return Object.keys(Key).map(k => Key[k]).every( kCode => kCode !== keyCode );
    }
}
