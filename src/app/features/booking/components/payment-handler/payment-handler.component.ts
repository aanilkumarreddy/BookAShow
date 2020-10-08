import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { MovieService } from './../../../movie/services/movie-service/movie.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from './../../../../core/services/login/login.service';
import { PaymentService } from './../../services/payment-service/payment.service';
import { BANKING_NAMES } from './../../constants/banking-name.constant';
import { BookingInfoService } from './../../services/booking-info/booking-info.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-handler',
  templateUrl: './payment-handler.component.html',
  styleUrls: ['./payment-handler.component.scss'],
})
export class PaymentHandlerComponent implements OnInit, OnDestroy {
  paymentForm: FormGroup;
  creditForm: FormGroup;
  upiForm: FormGroup;
  netBankingForm: FormGroup;
  bankingList = BANKING_NAMES;
  pastBookings: any[];
  movieDetails: any;
  years = [
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
    2031,
    2032,
    2033,
    2034,
    2035,
  ];

  upis = [
    {
      value: 'gPay',
      name: 'Google pay',
    },
    {
      value: 'phonePe',
      name: 'Phone pe',
    },
    {
      value: 'others',
      name: 'Other Upis',
    },
  ];

  showOtherUpiTextField = false;
  bookingInfo: any;
  userData: any;

  loginSubscription: Subscription;
  fireSubscription: Subscription;
  constructor(
    private bookingInfoService: BookingInfoService,
    private router: Router,
    private paymentService: PaymentService,
    private loginService: LoginService,
    private af: AngularFireDatabase,
    private movieService: MovieService,
    private datePipe: DatePipe,
    private manualSpinnyService: ManualSpinnyService,
    private snackBarService: SnackBarService
  ) {
    this.manualSpinnyService.spin$.next(true);
    this.buildForm();
    this.getLogInInfo();
  }

  ngOnInit(): void {
    this.getBookingInfo();
    this.getMovieDetails();
  }

  buildForm(): void {
    this.paymentForm = new FormGroup({
      creditForm: new FormGroup({
        cvv: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]{3,4}$/),
        ]),
        cardCode: new FormControl('', this.validateCreditCard),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
      }),
      upiForm: new FormGroup({
        upiType: new FormControl('', Validators.required),
        upiText: new FormControl(''),
      }),
      netBankingForm: new FormGroup({
        bankName: new FormControl('', Validators.required),
      }),
    });
    this.creditForm = this.paymentForm.controls.creditForm as FormGroup;
    this.netBankingForm = this.paymentForm.controls.netBankingForm as FormGroup;
    this.upiForm = this.paymentForm.controls.upiForm as FormGroup;
  }

  getLogInInfo(): void {
    this.loginSubscription = this.loginService.afAuth.authState.subscribe(
      (res) => {
        if (res) {
          this.userData = res;
          this.getPastBookingInfo(this.userData.uid);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBookingInfo(): void {
    this.bookingInfo = this.bookingInfoService.getBookingInfo();
    if (!this.bookingInfo) {
      this.router.navigateByUrl('/home');
    }
  }

  getMovieDetails(): void {
    this.movieService
      .getMovieById(this.bookingInfo.movieId)
      .then((res) => {
        this.movieDetails = res;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.manualSpinnyService.spin$.next(false);
      });
  }

  getPastBookingInfo(uid): void {
    this.fireSubscription = this.af
      .object('users/' + uid)
      .valueChanges()
      .subscribe(
        (res: any) => {
          this.pastBookings = (res || {}).bookings || [];
        },
        (err) => {
          this.pastBookings = [];
        }
      );
  }

  validateCreditCard(control: FormControl): ValidationErrors {
    let result: ValidationErrors;
    const value = control.value || '';
    if (
      !(
        value.startsWith('37') ||
        value.startsWith('4') ||
        value.startsWith('5')
      )
    ) {
      // Return error if card is not Amex, Visa or Mastercard
      result = {
        creditCard:
          'Credit/Debit ard number is not from a supported credit card provider',
      };
    } else if (value.length !== 16) {
      // Return error if length is not 16 digits
      result = {
        creditCard: 'Credit/Debit card number must be 16-digit long',
      };
    } else if (!/^\d+$/.test(value)) {
      result = {
        creditCard: 'Credit/Debit card number should contain numbers',
      };
    } else {
      result = {};
    }
    return result;
  }

  radioChange(e): void {
    if (e.value.value === 'others') {
      this.showOtherUpiTextField = true;
      this.upiForm.controls.upiText.setValidators([Validators.required]);
    } else {
      this.upiForm.controls.upiText.clearValidators();
      this.showOtherUpiTextField = false;
    }
    this.upiForm.controls.upiText.updateValueAndValidity();
  }

  processPayment(): void {
    this.manualSpinnyService.spin$.next(true);

    const newBooking = {
      movieId: this.bookingInfo.movieId,
      bookedSeats: this.bookingInfo.bookedSeats,
      bookedFor: this.datePipe.transform(
        this.bookingInfo.bookedFor,
        'MM-dd-yyyy'
      ),
      slotTime: this.bookingInfo.slotTime,
      price: this.bookingInfo.price,
      theater: this.bookingInfo.theater,
    };

    this.pastBookings.push(newBooking);
    this.disableSeats();
    this.paymentService
      .storeUserBookingDetails(this.pastBookings, this.userData.uid)
      .then((res) => {
        this.snackBarService.success('Movie Tickets Booked Successfully');
        this.router.navigateByUrl('user/past-booking');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.manualSpinnyService.spin$.next(false);
      });
  }

  disableSeats(): void {
    const dateFormat = this.datePipe.transform(
      this.bookingInfo.bookedFor,
      'MM-dd-yyyy'
    );
    const slotTime = this.bookingInfo.slotTime;
    const details = this.movieDetails.theater.bookedSeats || [];
    const currentSeatDetails = details.find((val) => {
      return val.date === dateFormat && val.slot === slotTime;
    });
    if (currentSeatDetails) {
      this.bookingInfo.bookedSeats.forEach((seat) => {
        ((currentSeatDetails || {}).seats || []).push(seat);
      });
      this.blockSeatsInConstant(this.movieDetails);
    } else {
      const movieDetails = this.movieDetails;
      (((movieDetails || {}).theater || {}).bookedSeats || []).push({
        date: dateFormat,
        slot: slotTime,
        seats: this.bookingInfo.bookedSeats,
      });
      this.blockSeatsInConstant(movieDetails);
    }
  }

  blockSeatsInConstant(movieDetails): void {
    this.paymentService
      .blockSeats(movieDetails)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.fireSubscription) {
      this.fireSubscription.unsubscribe();
    }
  }
}
