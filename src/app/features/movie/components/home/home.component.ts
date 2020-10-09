import { isPlatformBrowser } from '@angular/common';
import { LoginService } from 'src/app/core/services/login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { debounceTime } from 'rxjs/operators';
import { DISTANCE } from './../../constants/distance.constant';
import { GENRES } from './../../constants/genres.constant';
import { LANGUAGES } from './../../constants/languages.constant';
import { FormGroup, FormControl } from '@angular/forms';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { MovieService } from './../../services/movie-service/movie.service';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  gridColumns = 3;
  moviesList = [];
  movieListDataSource: any;
  upcomingMovieList = [];
  upcomingMovieDataSource: any;
  locationDetails: any;
  filterForm: FormGroup;
  isMobile = false;
  filterValues = {
    searchText: '',
    language: '',
    genre: '',
    distance: '',
  };
  userDetails: any;
  alertDetails: any;
  isBrowser = false;

  loginSubscription: Subscription;
  valueChangesSubscription: Subscription;
  fireSubscription: Subscription;
  constructor(
    private movieService: MovieService,
    private mapsAPILoader: MapsAPILoader,
    private manualSpinnyService: ManualSpinnyService,
    private fireDatabase: AngularFireDatabase,
    private loginService: LoginService,
    @Inject(PLATFORM_ID) platformId,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.manualSpinnyService.spin$.next(true);
    this.buildForm();
    this.getCurrentLocation();
    this.checkIfMobile();
    this.loginSubscription = this.loginService.afAuth.authState.subscribe((res) => {
      this.userDetails = res;
      if (res) {
        this.getAlertDetails();
      }
    });
  }

  ngOnInit(): void {
    this.valueChangesSubscription = this.filterForm.valueChanges.pipe(debounceTime(400)).subscribe((res) => {
      this.applyFilter();
    });
  }

  buildForm(): void {
    this.filterForm = new FormGroup({
      searchText: new FormControl(''),
      language: new FormControl(LANGUAGES),
      genre: new FormControl(GENRES),
      distance: new FormControl(DISTANCE[0]),
    });
  }

  getAlertDetails(): void {
    this.fireDatabase
      .object('/users/' + this.userDetails.uid)
      .valueChanges()
      .subscribe((res: any) => {
        this.alertDetails = (res || {}).alerts;
      });
  }

  getMovies(isDistanceReq: boolean): void {
    this.movieService
      .getMovieList()
      .then((res) => {
        this.parseMovies(res, isDistanceReq);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  parseMovies(movies: any[], isDistanceReq: boolean): void {
    const currentMovies = [];
    const upComingMovies = [];
    movies.forEach((movie) => {
      if (movie.theater) {
        const str = ((movie.theater || {}).fromDate || '').split('-');
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const date = Number(str[0]);
        const startDate = new Date(year, month, date);
        if (isDistanceReq) {
          movie.theater.distance = this.getDistance(movie.theater);
        }
        if (startDate <= new Date()) {
          currentMovies.push(movie);
        } else {
          upComingMovies.push(movie);
        }
      } else {
        upComingMovies.push(movie);
      }
    });
    this.upcomingMovieList = upComingMovies;
    this.moviesList = this.sortMovies(currentMovies, 'theater', 'distance');
    this.movieListDataSource = new MatTableDataSource(this.moviesList);
    this.movieListDataSource.filterPredicate = this.createFilter();
    this.upcomingMovieDataSource = new MatTableDataSource(upComingMovies);
    this.upcomingMovieDataSource.filterPredicate = this.createFilter();
    this.manualSpinnyService.spin$.next(false);
  }

  sortMovies(movies: any[], property1, property2): any {
    movies.sort((a, b) => {
      if (a[property1][property2] < b[property1][property2]) {
        return -1;
      }
      if (a[property1][property2] > b[property1][property2]) {
        return 1;
      }
      return 0;
    });
    return movies;
  }

  getDistance(theaterDetails): number | string {
    if (theaterDetails && this.locationDetails) {
      const location1 = new google.maps.LatLng(theaterDetails.latitude, theaterDetails.longitude);
      const currentLocation = new google.maps.LatLng(this.locationDetails.lat, this.locationDetails.lng);
      const distance = google.maps.geometry.spherical.computeDistanceBetween(location1, currentLocation);
      return distance / 1000;
    } else {
      return null;
    }
  }

  getCurrentLocation(): void {
    this.movieService
      .getPosition()
      .then((res) => {
        this.locationDetails = res;
      })
      .catch((err) => {
        alert('Please Enable Location');
      })
      .finally(() => {
        this.loadGoogleMaps();
      });
  }

  loadGoogleMaps(): void {
    this.mapsAPILoader
      .load()
      .then((res) => {
        this.getMovies(true);
      })
      .catch((err) => {
        console.log(err);
        this.getMovies(false);
      });
  }

  // single search
  //  data.languages.indexOf(searchTerms.language) > -1 &&
  // data.genres.indexOf(searchTerms.genre) > -1
  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      let distanceFlag = true;
      if (searchTerms.distance) {
        distanceFlag = ((data || {}).theater || {}).distance <= searchTerms.distance;
      }
      return (
        ((data || {}).languages || []).some((c) => ((searchTerms || {}).language || []).indexOf(c) > -1) &&
        ((data || {}).genres || []).some((d) => ((searchTerms || {}).genre || []).indexOf(d) > -1) &&
        distanceFlag &&
        this.getState(data, searchTerms.searchText)
      );
    };
    return filterFunction;
  }

  applyFilter(): void {
    const formValue = this.filterForm.getRawValue();
    this.filterValues.language = formValue.language;
    this.filterValues.genre = formValue.genre;
    this.filterValues.distance = (formValue.distance || {}).value;
    this.filterValues.searchText = formValue.searchText;
    this.movieListDataSource.filter = JSON.stringify(this.filterValues);
    this.upcomingMovieDataSource.filter = JSON.stringify(this.filterValues);
  }

  getState(data: any, inputValue: string, state = false): boolean {
    for (const value of Object.values(data)) {
      if (typeof value === 'object' && value !== null && Object.keys(value).length > 0 && state === false) {
        state = this.getState(value, inputValue, state);
      } else {
        if (state === false) {
          state = JSON.stringify(value).toLowerCase().includes(inputValue.toLowerCase());
        } else {
          return state;
        }
      }
    }
    return state;
  }

  checkIfMobile(): void {
    if (this.isBrowser && navigator.share) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.fireSubscription) {
      this.fireSubscription.unsubscribe();
    }
  }
}
