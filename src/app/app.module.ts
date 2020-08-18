import { InMemoryDataService } from './core/services/in-memory-data.service';
import { environment } from './../environments/environment.prod';
import { MaterialModule } from './core/material-module/material.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientInMemoryWebApiModule,
  InMemoryWebApiModule,
} from 'angular-in-memory-web-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    FlexLayoutModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
