import { Injectable } from '@angular/core';

@Injectable()
export class BookingInfoService {
  bookingInfo: any;
  constructor() {}

  setBookingInfo(bookingInfo): void {
    this.bookingInfo = bookingInfo;
  }

  getBookingInfo(): any {
    return this.bookingInfo;
  }
}
