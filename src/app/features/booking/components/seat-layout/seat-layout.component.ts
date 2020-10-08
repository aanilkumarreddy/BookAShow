import { Subscription } from 'rxjs';
import { BookingInfoService } from './../../services/booking-info/booking-info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from './../../../movie/services/movie-service/movie.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.scss'],
})
export class SeatLayoutComponent implements OnInit, OnDestroy {
  seatForm: FormGroup;
  seatsLayout = {
    totalRows: 9,
    seatsPerRow: 16,
    seatNaming: 'rowType',
    booked: [],
    disabled: [],
  };
  typeOfSeats: any;
  rows = [];
  newRows = [];
  todaysDate = new Date();
  lastdate = new Date();
  movieDetails: any;
  routerSubscription: Subscription;
  valueChangesSubscription: Subscription;
  constructor(
    private router: Router,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private bookingInfoService: BookingInfoService
  ) {
    this.createForm();
    this.routerSubscription = this.route.queryParams.subscribe((res) => {
      this.getMovieDetails(+(res || {}).movieId);
    });
  }

  ngOnInit(): void {
    const rows = [];
    let seatsInARow = [];
    let seatChar;
    if (
      this.seatsLayout !== undefined &&
      this.seatsLayout.hasOwnProperty('totalRows')
    ) {
      if (this.seatsLayout.seatNaming === 'rowType') {
        for (let row = 0; row < this.seatsLayout.totalRows; row++) {
          for (let seats = 0; seats < this.seatsLayout.seatsPerRow; seats++) {
            seatChar = String.fromCharCode(65 + seats);
            seatsInARow.push((row + 1).toString() + seatChar);
          }
          rows.push(seatsInARow);
          seatsInARow = [];
        }
      }
    }
    this.rows = rows;

    this.valueChangesSubscription = this.seatForm.valueChanges.subscribe(
      (res: any) => {
        if (res.date && res.slot) {
          this.getBookedSeats(this.movieDetails.theater.bookedSeats);
        }
      }
    );
  }

  createForm(): void {
    this.seatForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      noOfSeats: new FormControl('', [Validators.required]),
      slot: new FormControl('', Validators.required),
    });
  }

  getMovieDetails(movieId): void {
    this.movieService
      .getMovieById(movieId)
      .then((res) => {
        this.movieDetails = res;
        this.lastdate = new Date(res.theater.toDate);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  seatAction(seat): void {
    const noOfSeatsReq = this.getFormValue('noOfSeats');
    if (this.seatsLayout.booked.indexOf(seat) >= 0) {
      this.seatsLayout.booked = this.seatsLayout.booked.filter((bookedSeat) => {
        return bookedSeat !== seat;
      });
    } else {
      if (this.seatsLayout.booked.length >= noOfSeatsReq) {
        this.seatsLayout.booked.splice(0, 1);
        this.seatsLayout.booked.push(seat);
      } else {
        this.seatsLayout.booked.push(seat);
      }
    }
  }

  getBookedSeats(bookedSeats: any[]): void {
    const alreadyBookedSeats = bookedSeats.find((res) => {
      return (
        Date.parse(res.date) ===
          (this.getFormValue('date') || {}).setHours(0, 0, 0, 0) &&
        res.slot === this.getFormValue('slot')
      );
    });
    this.seatsLayout.disabled = alreadyBookedSeats
      ? alreadyBookedSeats.seats
      : [];
  }

  bookSeats(): void {
    const bookingInfoObj = {
      movieId: this.movieDetails.id,
      bookedSeats: this.seatsLayout.booked,
      bookedFor: this.getFormValue('date'),
      slotTime: this.getFormValue('slot'),
      price: 250,
      theater: {
        name: ((this.movieDetails || {}).theater || {}).name,
        address: ((this.movieDetails || {}).theater || {}).address,
      },
    };
    this.bookingInfoService.setBookingInfo(bookingInfoObj);
    this.router.navigate(['/booking/paymentHandler']);
  }

  getFormValue(params): any {
    const formValue = this.seatForm.getRawValue();
    return formValue[params];
  }

  isDisabled(): boolean {
    if (this.seatForm.invalid) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
