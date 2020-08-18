import { SearchResultsComponent } from './components/home/search-results/search-results.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FilterComponent } from './components/home/filter/filter.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movieDetail',
    component: MovieDetailsComponent,
  },
  {
    path: 'search',
    component: SearchResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
