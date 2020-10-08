import { Subscription } from 'rxjs';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { AlertService } from './../../services/alert-service/alert.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from './../../../../core/services/login/login.service';
import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { MovieService } from './../../services/movie-service/movie.service';
import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails: any;
  movieDetailsImdb: any;
  movieDetailsLoaded = false;
  todaysDate = new Date();
  userDetails: any;
  maxDate: any;
  alertDetails: any;
  isMobile: boolean;
  shareUrl = '';
  isBrowser = false;

  routerSubscription: Subscription;
  movieSubscription: Subscription;
  loginSubscription: Subscription;
  fireSubscription: Subscription;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private manualSpinnyService: ManualSpinnyService,
    private snackBarService: SnackBarService,
    private loginService: LoginService,
    private fireDatabase: AngularFireDatabase,
    private alertService: AlertService,
    private datePipe: DatePipe,
    @Inject(PLATFORM_ID) platdormId,
  ) {
    this.isBrowser = isPlatformBrowser(platdormId);
    this.manualSpinnyService.spin$.next(true);
    this.routerSubscription = this.route.queryParams.subscribe((res) => {
      this.getMovieDetails(+(res || {}).movieId);
    });
    this.checkIfMobile();
  }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.afAuth.authState.subscribe((res) => {
      if (res) {
        this.userDetails = res;
        this.getAlertDetails();
      }
    });
    if (this.isBrowser) {
      this.shareUrl = window.location.href;
    }
  }

  getMovieDetails(movieId: number): any {
    this.movieService
      .getMovieById(movieId)
      .then((res) => {
        this.movieDetails = res;
        if (((res || {}).theater || {}).toDate) {
          this.maxDate = new Date(res.theater.toDate);
        }
        if (res.imdbId) {
          this.getRating(res.imdbId);
        } else {
          this.manualSpinnyService.spin$.next(false);
        }
      })
      .catch((err) => {
        console.log(err);
        this.snackBarService.error('Movie Not Available');
        this.router.navigateByUrl('/home');
      })
      .finally(() => {
        this.movieDetailsLoaded = true;
      });
  }

  proceed(): void {
    this.router.navigate(['/booking/seatLayout'], {
      queryParams: {
        movieId: this.movieDetails.id,
      },
    });
  }

  getRating(imdbId): void {
    this.movieSubscription = this.movieService.getImdbMovieDetails(imdbId).subscribe(
      (res) => {
        this.movieDetailsImdb = res;
      },
      (err) => {
        console.log(err);
        this.manualSpinnyService.spin$.next(false);
      },
      () => {
        this.manualSpinnyService.spin$.next(false);
      },
    );
  }

  getImagePath(movieDetails): string {
    if ((movieDetails || {}).poster_url) {
      return '../../../../../assets/images/' + (movieDetails || {}).poster_url;
    } else if ((movieDetails || {}).dynamicImageUrl) {
      return (movieDetails || {}).dynamicImageUrl;
    } else {
      return '../../../../../assets/images/img_not.png';
    }
  }

  getAlertDetails(): void {
    if (this.userDetails.uid) {
      this.fireSubscription = this.fireDatabase
        .object('/users/' + this.userDetails.uid)
        .valueChanges()
        .subscribe((res: any) => {
          this.alertDetails = (res || {}).alerts;
        });
    }
  }

  addAlert(date): void {
    const alertDate = this.datePipe.transform(date.value, 'MM-dd-yyyy');
    const alertDetails = this.alertDetails ? this.alertDetails : [];
    alertDetails.push({
      date: alertDate,
      movieId: this.movieDetails.id,
      movieName: (this.movieDetails || {}).title,
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

  checkIfMobile(): void {
    if (this.isBrowser && navigator.share) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
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

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
    if (this.fireSubscription) {
      this.fireSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
