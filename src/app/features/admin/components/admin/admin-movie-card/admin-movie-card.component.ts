import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-movie-card',
  templateUrl: './admin-movie-card.component.html',
  styleUrls: ['./admin-movie-card.component.scss'],
})
export class AdminMovieCardComponent implements OnInit {
  @Input() movieDetails: any;
  constructor() {}

  ngOnInit(): void {}

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
}
