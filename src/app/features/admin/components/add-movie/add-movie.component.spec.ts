import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { MovieService } from './../../../movie/services/movie-service/movie.service';
import { MovieWrapperService } from './../../services/movie-wrapper/movie-wrapper.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/core/material-module/material.module';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  const movieWrapperStub = {
    createMovieObj: (formValue) => {
      return {};
    },
  };
  const movieStub = {
    searchMovie: (movieName) => {
      return Promise.resolve({
        results: [
          {
            name: 'KGF',
          },
        ],
      });
    },
    addMovie: (movieObj) => {
      return Promise.resolve({});
    },
  };
  const locationStub = {
    back: () => {},
  };
  const snackStub = {
    success: (msg) => {},
    error: (msg) => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMovieComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
      ],
      providers: [
        { provide: MovieWrapperService, useValue: movieWrapperStub },
        { provide: MovieService, useValue: movieStub },
        { provide: Location, useValue: locationStub },
        { provide: SnackBarService, useValue: snackStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test addNewCastDetails method ', () => {
    expect(component.addNewCastDetails).toBeDefined();
    spyOn(component, 'addNewCastDetails').and.callThrough();
    component.addNewCastDetails('castForm', 'getCastForm');
    expect(component.addNewCastDetails).toHaveBeenCalled();
  });
  it('Sholud test deleteCastRow method ', () => {
    expect(component.deleteCastRow).toBeDefined();
    spyOn(component, 'deleteCastRow').and.callThrough();
    component.deleteCastRow(0, 'castForm');
    expect(component.deleteCastRow).toHaveBeenCalled();
  });
  it('Sholud test titleSelected method ', () => {
    const movieDetails = {
      overview: 'hfgsfsg jfdd',
      id: 633,
    };
    component.movieForm.patchValue({
      title: 'kgf',
    });
    expect(component.titleSelected).toBeDefined();
    spyOn(component, 'titleSelected').and.callThrough();
    component.titleSelected(movieDetails);
    expect(component.titleSelected).toHaveBeenCalled();
  });
  it('Sholud test addMovie method ', () => {
    expect(component.addMovie).toBeDefined();
    spyOn(component, 'addMovie').and.callThrough();
    component.addMovie();
    expect(component.addMovie).toHaveBeenCalled();
  });
  it('Sholud test back method ', () => {
    expect(component.back).toBeDefined();
    spyOn(component, 'back').and.callThrough();
    component.back();
    expect(component.back).toHaveBeenCalled();
  });
  it('Sholud test searchMovie method ', () => {
    expect(component.searchMovie).toBeDefined();
    spyOn(component, 'searchMovie').and.callThrough();
    component.searchMovie('kgf');
    expect(component.searchMovie).toHaveBeenCalled();
  });
  it('calls ngOnDestroy method', () => {
    component.valuChangesSubscription = new Subscription();
    spyOn(component.valuChangesSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.valuChangesSubscription.unsubscribe).toHaveBeenCalled();
  });
});
