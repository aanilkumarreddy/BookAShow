import { MovieService } from './../../../../movie/services/movie-service/movie.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-past-booking-card',
  templateUrl: './past-booking-card.component.html',
  styleUrls: ['./past-booking-card.component.scss'],
})
export class PastBookingCardComponent implements OnInit {
  @Input() bookingDetails: any;
  movieDetails: any;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovieDetails(this.bookingDetails.movieId);
  }

  toggleDetails(event): void {
    const card = event.target.closest('mat-card');
    if (card.classList.contains('opened')) {
      card.classList.add('closed');
      card.classList.remove('opened');
      // event.target.closest('.toggle-details md-icon').innerHTML = 'expand_more'
    } else {
      card.classList.add('opened');
      card.classList.remove('closed');
      // event.target.closest('.toggle-details md-icon').innerHTML = 'expand_less'
    }
  }

  getMovieDetails(movieId): void {
    this.movieService.getMovieById(movieId).then((res) => {
      this.movieDetails = res;
    });
  }
}
