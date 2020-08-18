import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from './../../core/material-module/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MovieCardComponent } from './components/home/movie-card/movie-card.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FilterComponent } from './components/home/filter/filter.component';
import { SearchResultsComponent } from './components/home/search-results/search-results.component';

@NgModule({
  declarations: [HomeComponent, MovieCardComponent, MovieDetailsComponent, FilterComponent, SearchResultsComponent],
  imports: [CommonModule, MovieRoutingModule, MaterialModule, SharedModule],
})
export class MovieModule {}
