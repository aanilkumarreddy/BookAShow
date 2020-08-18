import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() componentType: any;

  isShowingNext = false;
  constructor() {}

  ngOnInit(): void {
    if (this.componentType === 'isShowingNext') {
      this.isShowingNext = true;
    }
  }
}
