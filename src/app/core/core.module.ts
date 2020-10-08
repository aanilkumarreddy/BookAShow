import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material-module/material.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/header/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
@NgModule({
  declarations: [HeaderComponent, LoginComponent, FooterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ],
  exports: [HeaderComponent, MaterialModule, FooterComponent],
  providers: [DatePipe],
})
export class CoreModule {}
