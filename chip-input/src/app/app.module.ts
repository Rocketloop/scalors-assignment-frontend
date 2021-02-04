import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChipInputComponent } from './common/components/chip-input/chip-input.component';
import { ChipComponent } from './common/components/chip-input/chip/chip.component';
import {FormsModule} from '@angular/forms';
import { ChipInputDropdownComponent } from './common/components/chip-input/chip-input-dropdown/chip-input-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    ChipInputComponent,
    ChipComponent,
    ChipInputDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
