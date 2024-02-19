import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Angular Material */
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
/* Angular Material */

import { ChipsComponent } from 'src/app/chips/chips.component';

@NgModule({
  declarations: [
    AppComponent,
    ChipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    /* Angular Material */
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatChipsModule
    /* Angular Material */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
