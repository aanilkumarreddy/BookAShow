import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
import { MaterialModule } from './material-module/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/header/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
