import { MovieService } from './../../../../movie/services/movie-service/movie.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../../../core/material-module/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastBookingCardComponent } from './past-booking-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PastBookingCardComponent', () => {
  let component: PastBookingCardComponent;
  let fixture: ComponentFixture<PastBookingCardComponent>;
  const movieStub = {
    getMovieById: (id) => {
      return Promise.resolve({});
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PastBookingCardComponent],
      imports: [MaterialModule, BrowserAnimationsModule, FlexLayoutModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: MovieService, useValue: movieStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastBookingCardComponent);
    component = fixture.componentInstance;
    component.bookingDetails = {
      movieId: 11,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test toggleDetails method ', () => {
    const event = {
      target: {
        closest: (arg1) => {
          return {
            classList: {
              contains: (arg1) => {
                return false;
              },
              add: (arg2) => {},
              remove: (arg2) => {},
            },
          };
        },
      },
    };
    expect(component.toggleDetails).toBeDefined();
    spyOn(component, 'toggleDetails').and.callThrough();
    component.toggleDetails(event);
    expect(component.toggleDetails).toHaveBeenCalled();
  });
  it('Sholud test toggleDetails method ', () => {
    const event = {
      target: {
        closest: (arg1) => {
          return {
            classList: {
              contains: (arg1) => {
                return true;
              },
              add: (arg2) => {},
              remove: (arg2) => {},
            },
          };
        },
      },
    };
    expect(component.toggleDetails).toBeDefined();
    spyOn(component, 'toggleDetails').and.callThrough();
    component.toggleDetails(event);
    expect(component.toggleDetails).toHaveBeenCalled();
  });
});
