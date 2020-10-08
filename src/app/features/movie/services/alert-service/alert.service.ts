import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  currentMessage = new BehaviorSubject(null);
  token = '';

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient,
  ) {
    // this.angularFireMessaging.messages.subscribe((messaging: any) => {
    //   messaging.onMessage = messaging.onMessage.bind(messaging);
    //   messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
    // });
  }

  updateToken(userId, token): void {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
      const data = {};
      data[userId] = token;
      // this.angularFireDB.object('fcmTokens/').update(data)
      this.updateFCMTokens(data);
    });
  }

  updateFCMTokens(data): void {
    this.angularFireDB
      .object('users/fcmTokens/')
      .update(data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  updateAlert(alertObj, userId): Promise<any> {
    return this.angularFireDB.object('users/' + userId).update({
      alerts: alertObj,
    });
  }

  receiveMessage(): void {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

  requestPermission(userId): void {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.token = token;
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      },
    );
  }

  sendPushNotification(title: string, message: string, redirectTo: string): void {
    const data = {
      notification: {
        title,
        body: message,
        click_action: redirectTo,
        sound: 'default',
        data: {
          url: redirectTo,
        },
      },
      to: this.token,
    };

    const postData = JSON.stringify(data);
    const url = 'https://fcm.googleapis.com/fcm/send';
    this.http
      .post(url, postData, {
        headers: new HttpHeaders()
          .set(
            'Authorization',
            'key=AAAA4uQosH4:APA91bEWlZgTigv--wCCaAzZgEi1bKEeEC1Dga1nWinWVvq6OU_S6c_JiARfLv9Pf8_HRuyBYdOFbHJHKRmSyvqVNpQlKnS1toSwpzoG8YYpfaB4YDlhLvJmZ9S8oeB102xxGAARQj0b',
          )
          .set('Content-Type', 'application/json'),
      })
      .subscribe(
        (response) => {},
        (error) => {
          console.log(error);
          console.log('error' + error);
        },
      );
  }
}
