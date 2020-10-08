import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { from, of, Subject, Subscription } from 'rxjs';
import { MaterialModule } from 'src/app/core/material-module/material.module';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ManualSpinnyService } from 'src/app/core/services/manual-spinny/manual-spinny.service';
import { MovieService } from 'src/app/features/movie/services/movie-service/movie.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';
import { BookingInfoService } from '../../services/booking-info/booking-info.service';

import { SeatLayoutComponent } from './seat-layout.component';

describe('SeatLayoutComponent', () => {
  let component: SeatLayoutComponent;
  let fixture: ComponentFixture<SeatLayoutComponent>;
  const bookingInfoStub = {
    getBookingInfo: () => {
      return {
        movieId: 11,
        bookedSeats: ['1A'],
        bookedFor: new Date(),
        slotTime: '02:30PM',
        theater: 'assada',
        price: 250,
      };
    },
    setBookingInfo: (bookingInfo) => {},
  };
  const routerStub = {
    navigate: (url) => {},
  };

  const authState = {
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
  };
  const loginStub = {
    afAuth: {
      authState: of(authState),
    },
  };

  const movieProm = {
    id: 11,
    title: 'jff',
    theater: {
      bookedSeats: [
        {
          date: '09-05-2020',
          slot: '10:30AM',
          seats: ['1A'],
        },
      ],
    },
  };
  const movieStub = {
    getMovieById: (id) => {
      return Promise.resolve(movieProm);
    },
  };
  const snackStub = {};
  const spinnyStub = {
    spin$: new Subject(),
  };
  const routeStub = {
    queryParams: of({ movieId: 11 }),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeatLayoutComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: BookingInfoService, useValue: bookingInfoStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: LoginService, useValue: loginStub },
        { provide: ManualSpinnyService, useValue: spinnyStub },
        { provide: SnackBarService, useValue: snackStub },
        { provide: MovieService, useValue: movieStub },
        DatePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatLayoutComponent);
    component = fixture.componentInstance;
    component.seatForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      noOfSeats: new FormControl('', [Validators.required]),
      slot: new FormControl('', Validators.required),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sholud test seatAction method ', () => {
    const seat = '1A';
    expect(component.seatAction).toBeDefined();
    spyOn(component, 'seatAction').and.callThrough();
    component.seatAction(seat);
    expect(component.seatAction).toHaveBeenCalled();
  });
  it('Sholud test seatAction method ', () => {
    const seat = '1A';
    component.movieDetails = movieProm;
    component.seatForm.patchValue({
      date: new Date(),
      slot: '09:30AM',
      noOfSeats: 2,
    });
    component.seatsLayout.booked.push(seat);
    expect(component.seatAction).toBeDefined();
    spyOn(component, 'seatAction').and.callThrough();
    component.seatAction(seat);
    expect(component.seatAction).toHaveBeenCalled();
  });
  it('Sholud test bookSeats method ', () => {
    component.movieDetails = movieProm;
    expect(component.bookSeats).toBeDefined();
    spyOn(component, 'bookSeats').and.callThrough();
    component.bookSeats();
    expect(component.bookSeats).toHaveBeenCalled();
  });
  it('calls ngOnDestroy method', () => {
    component.valueChangesSubscription = new Subscription();
    component.routerSubscription = new Subscription();
    spyOn(component.valueChangesSubscription, 'unsubscribe');
    spyOn(component.routerSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.valueChangesSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.routerSubscription.unsubscribe).toHaveBeenCalled();
  });
});
