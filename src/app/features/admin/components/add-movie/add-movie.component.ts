import { debounceTime, distinctUntilChanged, skipWhile, startWith } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { MovieService } from './../../../movie/services/movie-service/movie.service';
import { SHOW_TIMINGS } from './../../../movie/constants/show-timings.constant';
import { MovieWrapperService } from './../../services/movie-wrapper/movie-wrapper.service';
import { LANGUAGES } from './../../../movie/constants/languages.constant';
import { GENRES } from './../../../movie/constants/genres.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit, OnDestroy {
  movieForm: FormGroup;
  castForm: FormArray;
  crewForm: FormArray;
  restrictionForm: FormArray;
  theaterForm: FormGroup;

  genresAutoCompleteValues = GENRES;
  languageAutoCompleteValues = LANGUAGES;
  showTimingValues = SHOW_TIMINGS;
  movieAutoCompleteValues: any = [];

  valuChangesSubscription: Subscription;
  minDate = new Date();
  constructor(
    private movieWrapperService: MovieWrapperService,
    private movieService: MovieService,
    private location: Location,
    private snackBarService: SnackBarService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.valuChangesSubscription = this.movieForm.controls.title.valueChanges
      .pipe(
        startWith(''),
        skipWhile((value) => value === ''),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((res) => {
        this.searchMovie(res);
      });
  }

  searchMovie(searchQuery: string): void {
    this.movieService
      .searchMovie(searchQuery)
      .then((res) => {
        this.movieAutoCompleteValues = (res || {}).results;
      })
      .catch((err) => {
        console.log(err);
        this.movieAutoCompleteValues = [];
      });
  }

  buildForm(): void {
    this.movieForm = new FormGroup({
      title: new FormControl('', Validators.required),
      sub_title: new FormControl(''),
      genres: new FormControl([]),
      languages: new FormControl([]),
      story: new FormControl('', Validators.required),
      poster_url: new FormControl(''),
      imdbId: new FormControl(''),
      castArray: new FormArray([this.getCastForm()]),
      crewArray: new FormArray([this.getCrewForm()]),
      theater: new FormGroup({
        name: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        latitude: new FormControl('', Validators.required),
        longitude: new FormControl('', Validators.required),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        foodAvailability: new FormControl(false),
        parking: new FormControl(false),
        dolby: new FormControl(false),
        fourK: new FormControl(false),
        restrictionsArray: new FormArray([this.getRestrictionForm()]),
        showTimings: new FormControl([], Validators.required),
      }),
    });
    this.castForm = this.movieForm.get('castArray') as FormArray;
    this.crewForm = this.movieForm.get('crewArray') as FormArray;
    this.theaterForm = this.movieForm.get('theater') as FormGroup;
    this.restrictionForm = this.theaterForm.get('restrictionsArray') as FormArray;
  }

  getCastForm(): FormGroup {
    return new FormGroup({
      role: new FormControl(''),
      name: new FormControl(''),
      character_name: new FormControl(''),
    });
  }

  getCrewForm(): FormGroup {
    return new FormGroup({
      role: new FormControl(''),
      name: new FormControl(''),
    });
  }

  addNewCastDetails(formName, formMethod): void {
    this[formName].push(this[formMethod]());
  }

  deleteCastRow(index: number, formName): void {
    this[formName].removeAt(index);
  }

  getRestrictionForm(): FormGroup {
    return new FormGroup({
      restriction: new FormControl(''),
    });
  }

  titleSelected(movieDetails): void {
    if (movieDetails) {
      this.movieForm.patchValue({
        story: (movieDetails || {}).overview,
        imdbId: (movieDetails || {}).id,
      });
    }
  }

  addMovie(): void {
    const movieObj = this.movieWrapperService.createMovieObj(this.movieForm);
    this.movieService
      .addMovie(movieObj)
      .then((res) => {
        this.snackBarService.success('Movie added successfully');
        this.location.back();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.valuChangesSubscription) {
      this.valuChangesSubscription.unsubscribe();
    }
  }
}
