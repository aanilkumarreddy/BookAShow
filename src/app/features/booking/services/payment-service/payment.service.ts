import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient, private fireDb: AngularFireDatabase) {}

  storeUserBookingDetails(bookings, userId): Promise<any> {
    return this.fireDb
      .object('users/' + userId)
      .update({
        bookings,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  blockSeats(movieObj): Promise<any> {
    return this.http.put('api/movies', movieObj).toPromise();
  }
}
