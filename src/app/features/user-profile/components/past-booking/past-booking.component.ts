import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { LoginService } from './../../../../core/services/login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-past-booking',
  templateUrl: './past-booking.component.html',
  styleUrls: ['./past-booking.component.scss'],
})
export class PastBookingComponent implements OnInit, OnDestroy {
  pastBookings = [];
  currentBookings = [];
  isBrowser = false;
  loginSubscription: Subscription;
  fireSubscription: Subscription;

  constructor(
    private af: AngularFireDatabase,
    private loginService: LoginService,
    private manualSpinnyService: ManualSpinnyService,
    @Inject(PLATFORM_ID) platformId,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.manualSpinnyService.spin$.next(true);
    this.isLoggedIn();
  }

  ngOnInit(): void {}

  isLoggedIn(): void {
    this.loginSubscription = this.loginService.afAuth.authState.subscribe(
      (res) => {
        if (res.uid) {
          this.getUserBookings(res.uid);
        }
      },
      (err) => {
        console.log(err);
        this.manualSpinnyService.spin$.next(true);
      },
    );
  }

  getUserBookings(uid): void {
    this.fireSubscription = this.af
      .object('users/' + uid)
      .valueChanges()
      .subscribe(
        (res: any) => {
          this.parseBookings((res || {}).bookings);
        },
        (err) => {
          console.log(err);
        },
      );
  }

  parseBookings(bookingDetails): void {
    (bookingDetails || []).forEach((booking) => {
      if (new Date(booking.bookedFor) < new Date()) {
        this.pastBookings.push(booking);
      } else {
        this.currentBookings.push(booking);
      }
    });
    this.manualSpinnyService.spin$.next(false);
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
