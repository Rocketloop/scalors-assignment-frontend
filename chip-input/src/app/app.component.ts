import { Component } from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chip-input';
  default = ['Java'];

  searchItems(key: string): Observable<string[]> {
    if (!key) {
      return of([]);
    }
    return of(['Java', 'JavaScript', 'PHP', 'Python', 'Go', 'Ruby', 'Objective-C']).pipe(
      map( results => results.filter(val => val.toLowerCase().indexOf(key.toLowerCase()) === 0) ),
      tap(val => console.log(val))
    );
  }
}
