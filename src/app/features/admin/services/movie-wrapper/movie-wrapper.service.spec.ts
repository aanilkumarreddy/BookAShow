import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { MovieWrapperService } from './movie-wrapper.service';

describe('MovieWrapperService', () => {
  let service: MovieWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe, MovieWrapperService],
    });
    service = TestBed.inject(MovieWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can call createMovieObj method', () => {
    const movieForm = new FormGroup({
      title: new FormControl(
        {
          title: 'kgf',
        },
        Validators.required
      ),
      sub_title: new FormControl(''),
      genres: new FormControl([]),
      languages: new FormControl([]),
      story: new FormControl('', Validators.required),
      poster_url: new FormControl(''),
      imdbId: new FormControl(''),
      castArray: new FormArray([
        new FormGroup({
          role: new FormControl(''),
          name: new FormControl(''),
          character_name: new FormControl(''),
        }),
      ]),
      crewArray: new FormArray([
        new FormGroup({
          role: new FormControl(''),
          name: new FormControl(''),
        }),
      ]),
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
        restrictionsArray: new FormArray([
          new FormGroup({
            restriction: new FormControl('', Validators.required),
          }),
        ]),
        showTimings: new FormControl([], Validators.required),
      }),
    });
    expect(service.createMovieObj).toBeDefined();
    spyOn(service, 'createMovieObj').and.callThrough();
    service.createMovieObj(movieForm);
    expect(service.createMovieObj).toHaveBeenCalled();
  });
});
