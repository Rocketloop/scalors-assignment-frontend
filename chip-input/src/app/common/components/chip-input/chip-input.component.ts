import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {fromEvent, merge, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, mapTo, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipInputComponent),
      multi: true
    }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipInputComponent implements OnInit, AfterViewInit {
  @Input() source: (key) => Observable<string[]>;
  @Input() placeholder = 'Search';
  set value(val){
    if ( val !== undefined && this.val !== val){
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }
  get value(): any {
    return this.val;
  }
  searchValues$: Observable<string[]>;
  searchStr: string;

  private val: Array<string> = [];

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('dropdown', {read: ElementRef}) dropdown: ElementRef;

  ngAfterViewInit(): void {
     const keyupObservable = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      map((e: any) => e.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(this.source),
      map( results => results.filter(val => this.value.indexOf(val) === -1) ),
    );

     const clickObservable = fromEvent(this.dropdown.nativeElement, 'click').pipe(
       mapTo([])
     );

     this.searchValues$ = merge(keyupObservable, clickObservable);
  }

  constructor() { }

  ngOnInit(): void {
  }

  onChange: any = () => {};
  onTouch: any = () => {};


  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void{
    this.onTouch = fn;
  }

  addItem(item: string): void {
    this.value = [...this.value, item];
    this.searchStr = '';
  }

  onRemove(val: string): void {
    const idx = this.value.indexOf(val);
    this.value.splice(idx, 1);
    this.value = [...this.value];
  }

}
