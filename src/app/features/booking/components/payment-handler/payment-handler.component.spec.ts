import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../../core/material-module/material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, of, Subject, Subscription } from 'rxjs';
import { PaymentHandlerComponent } from './payment-handler.component';
import { BookingInfoService } from '../../services/booking-info/booking-info.service';
import { PaymentService } from '../../services/payment-service/payment.service';
import { LoginService } from './../../../../core/services/login/login.service';
import { DatePipe } from '@angular/common';
import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { MovieService } from './../../../movie/services/movie-service/movie.service';

describe('PaymentHandlerComponent', () => {
  let component: PaymentHandlerComponent;
  let fixture: ComponentFixture<PaymentHandlerComponent>;

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
  };
  const routerStub = {
    navigateByUrl: (url) => {},
  };
  const paymentStub = {
    blockSeats: (movieDetails) => {
      return Promise.resolve({});
    },
    storeUserBookingDetails: (pastbookings, uid) => {
      return Promise.resolve({});
    },
  };
  const authState = {
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
  };
  const loginStub = {
    afAuth: {
      authState: of(authState),
    },
  };
  const data = from([{ id: 1, name: '' }]);

  const objectFireDb = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
  };
  const fireDbStub = {
    object: jasmine.createSpy('object').and.returnValue(objectFireDb),
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
  const snackStub = {
    success: (msg) => {},
    error: (msg) => {},
  };
  const spinnyStub = {
    spin$: new Subject(),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentHandlerComponent],
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
        { provide: PaymentService, useValue: paymentStub },
        { provide: LoginService, useValue: loginStub },
        { provide: AngularFireDatabase, useValue: fireDbStub },
        { provide: ManualSpinnyService, useValue: spinnyStub },
        { provide: SnackBarService, useValue: snackStub },
        { provide: MovieService, useValue: movieStub },
        DatePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test radioChange method ', () => {
    const event = {
      value: {
        value: 'others',
      },
    };
    expect(component.radioChange).toBeDefined();
    spyOn(component, 'radioChange').and.callThrough();
    component.radioChange(event);
    expect(component.radioChange).toHaveBeenCalled();
  });
  it('Sholud test radioChange else method ', () => {
    const event = {
      value: {
        value: 'gpay',
      },
    };
    expect(component.radioChange).toBeDefined();
    spyOn(component, 'radioChange').and.callThrough();
    component.radioChange(event);
    expect(component.radioChange).toHaveBeenCalled();
  });
  it('Sholud test processPayment method ', () => {
    component.movieDetails = movieProm;
    expect(component.processPayment).toBeDefined();
    spyOn(component, 'processPayment').and.callThrough();
    component.processPayment();
    expect(component.processPayment).toHaveBeenCalled();
  });
  it('calls ngOnDestroy method', () => {
    component.loginSubscription = new Subscription();
    component.fireSubscription = new Subscription();
    spyOn(component.loginSubscription, 'unsubscribe');
    spyOn(component.fireSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.loginSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.fireSubscription.unsubscribe).toHaveBeenCalled();
  });
});
