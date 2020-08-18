import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  latitude = 0;
  longitude = 0;

  constructor(private router: Router) {
    this.getAccuratePos();
  }

  ngOnInit(): void {}

  public getPosition(): Observable<Position> {
    return Observable.create((observer) => {
      navigator.geolocation.watchPosition((pos: Position) => {
        observer.next(pos);
      }),
        () => {
          console.log('Position is not available');
        },
        {
          enableHighAccuracy: true,
        };
    });
  }

  getAccuratePos() {
    this.getPosition().subscribe((res) => {
      console.log('accurate', res);
      (this.latitude = +res.coords.latitude),
        (this.longitude = +res.coords.longitude);
    });
  }

  proceed(): void {
    this.router.navigateByUrl('/booking/seatLayout');
  }
}
