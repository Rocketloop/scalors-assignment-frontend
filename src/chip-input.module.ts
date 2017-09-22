import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChipInputComponent } from './components/chip-input/chip-input.component';

@NgModule({
    declarations: [
        ChipInputComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
    ],
    exports: [
        ChipInputComponent
    ]

})
export class ChipInputModule { }
