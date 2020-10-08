import { Component, OnInit } from '@angular/core';

import { ManualSpinnyService } from 'src/app/core/services/manual-spinny/manual-spinny.service';
import { MovieService } from './../../../movie/services/movie-service/movie.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  moviesList: any[] = [];
  upcomingMoviesList: any[] = [];

  constructor(
    private movieService: MovieService,
    private manualSpinnySevice: ManualSpinnyService
  ) {
    this.manualSpinnySevice.spin$.next(true);
    this.getMoviesList();
  }

  ngOnInit(): void {}

  getMoviesList(): void {
    this.movieService
      .getMovieList()
      .then((res) => {
        this.parseMovies(res);
        this.manualSpinnySevice.spin$.next(false);
      })
      .catch((err) => {
        console.log(err);
        this.manualSpinnySevice.spin$.next(false);
      });
  }

  parseMovies(movies): void {
    movies.forEach((movie) => {
      if (movie.theater) {
        if (new Date(movie.theater.fromDate) <= new Date()) {
          this.moviesList.push(movie);
        } else {
          this.upcomingMoviesList.push(movie);
        }
      } else {
        this.upcomingMoviesList.push(movie);
      }
    });
  }
}
