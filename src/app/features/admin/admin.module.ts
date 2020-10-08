import { MovieWrapperService } from './services/movie-wrapper/movie-wrapper.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../core/material-module/material.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminMovieCardComponent } from './components/admin/admin-movie-card/admin-movie-card.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';

@NgModule({
  declarations: [AdminComponent, AdminMovieCardComponent, AddMovieComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe, MovieWrapperService],
})
export class AdminModule {}
