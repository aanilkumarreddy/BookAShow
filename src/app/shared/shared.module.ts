import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../core/material-module/material.module';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { InputComponent } from './components/input/input.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';

@NgModule({
  declarations: [ChipListComponent, InputComponent, AutoCompleteComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCqrBM1a2zD-EUDXgUFRywhREZYpjPuI6A',
      libraries: ['geometry'],
    }),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FlexLayoutModule,
    AgmCoreModule,
    ChipListComponent,
    InputComponent,
    AutoCompleteComponent,
  ],
})
export class SharedModule {}
