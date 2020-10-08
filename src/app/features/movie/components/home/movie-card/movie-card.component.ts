import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { SnackBarService } from './../../../../../shared/services/snack-bar/snack-bar.service';
import { AlertService } from './../../../services/alert-service/alert.service';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  alertDetails: any;
  userDetails: any;
  isBrowser = false;
  @Input() componentType: any;
  @Input() movieDetails: any;
  @Input() locationDetails: any;
  @Input() isMobile: boolean;

  @Input('alertDetails') set updateAlertDetails(alertDetails) {
    this.alertDetails = alertDetails;
  }

  @Input('userDetails') set updateUserDetails(userDetails) {
    this.userDetails = userDetails;
  }

  shareUrl = '';

  isShowingNext = false;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private snackBarService: SnackBarService,
    @Inject(PLATFORM_ID) platformId,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.componentType === 'isShowingNext') {
      this.isShowingNext = true;
    }
    let url = '';
    if (this.isBrowser) {
      url = window.location.href.split('?')[0] + '/movieDetail?movieId=' + this.movieDetails.id;
    }
    this.shareUrl = url;
  }

  getImagePath(movieObj): string {
    if ((movieObj || {}).poster_url) {
      const defaultPath = '../../../../../../assets/images/';
      return defaultPath + movieObj.poster_url;
    } else if ((movieObj || {}).dynamicImageUrl) {
      return (movieObj || {}).dynamicImageUrl;
    } else {
      return '../../../../../../assets/images/img_not.png';
    }
  }

  matCardClick(movieDetails): void {
    this.router.navigate(['/booking/seatLayout'], {
      queryParams: {
        movieId: movieDetails.id,
      },
    });
  }

  shareMovie(movieDetails): void {
    if (this.isBrowser) {
      navigator
        .share({
          title: (movieDetails || {}).title,
          text: (movieDetails || {}).title,
          url: this.shareUrl,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  addAlert($event, movieDetails): void {
    $event.stopPropagation();
    const alertDetails = this.alertDetails ? this.alertDetails : [];
    alertDetails.push({
      date: ((movieDetails || {}).theater || {}).fromDate,
      movieId: movieDetails.id,
      movieName: (movieDetails || {}).title,
      url: this.shareUrl,
    });
    if ((this.userDetails || {}).uid) {
      this.alertService
        .updateAlert(alertDetails, this.userDetails.uid)
        .then((res) => {
          this.snackBarService.success('Alert added');
        })
        .catch((err) => {
          this.snackBarService.error('Please Login to enable this feature');
        });
    } else {
      this.snackBarService.error('Please login to get notified');
    }
  }
}
