import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BookAShow';
  isDarkTheme = false;
  longitude = 0;
  latitude = 0;

  constructor(private overlay: OverlayContainer) {
    this.getAccuratePos();
  }
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.overlay.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlay.getContainerElement().classList.remove('dark-theme');
    }
  }

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
      console.log(res);
      (this.latitude = +res.coords.latitude),
        (this.longitude = +res.coords.longitude);
    });
  }
}
