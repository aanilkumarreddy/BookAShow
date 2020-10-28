import { DatePipe, isPlatformBrowser } from '@angular/common';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, ViewChild, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { AlertService } from './../../../features/movie/services/alert-service/alert.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './../../services/login/login.service';
import { ManualSpinnyService } from './../../services/manual-spinny/manual-spinny.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleTheme: EventEmitter<any> = new EventEmitter<any>();
  isLoggedIn = false;
  isAdmin = false;
  alertDetails: any;
  notifications: any = [];

  alertSubscription: Subscription;
  loginSubscription: Subscription;
  fireSubscription: Subscription;

  @ViewChild('endNav') endNav: MatSidenav;

  constructor(
    private matDialog: MatDialog,
    private loginService: LoginService,
    private router: Router,
    private manulaSpinnyService: ManualSpinnyService,
    private fireDb: AngularFireDatabase,
    private alertService: AlertService,
    private datePipe: DatePipe,
  ) {
    this.manulaSpinnyService.spin$.next(true);
    this.checkAuthState();
  }

  ngOnInit(): void {
    this.alertService.receiveMessage();
    this.alertSubscription = this.alertService.currentMessage.subscribe((res) => {
      if ((res || {}).notification) {
        this.notifications.push(res.notification);
      }
    });
  }

  checkAuthState(): void {
    this.loginSubscription = this.loginService.afAuth.authState.subscribe(
      (res) => {
        if (res) {
          this.isAdmin = false;
          this.loggedIn(res.email);
          this.getAlertDetails(res.uid);
          this.alertService.requestPermission(res.uid);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.manulaSpinnyService.spin$.next(false);
      },
    );
    if (sessionStorage.getItem('isLoggedIn') === 'admin@admin.com') {
      this.loggedIn('admin@admin.com');
      this.isAdmin = true;
    }
  }

  getAlertDetails(uid): void {
    this.fireSubscription = this.fireDb
      .object('/users/' + uid)
      .valueChanges()
      .subscribe((res: any) => {
        this.alertDetails = (res || {}).alerts;
        this.checkForAlertReq((res || {}).alerts);
      });
  }

  checkForAlertReq(alerts): void {
    const todaysDate = this.datePipe.transform(new Date(), 'MM-dd-yyyy');
    (alerts || []).forEach((alert) => {
      if (alert.date === todaysDate) {
        this.sendPushMsg(alert.movieName, alert.movieId, alert.url);
      }
    });
  }

  changeTheme(): void {
    this.toggleTheme.emit();
  }

  login(): any {
    this.matDialog
      .open(LoginComponent, {
        width: '500px',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'admin@admin.com') {
          this.loggedIn(res);
        }
      });
  }

  loggedIn(loginData): void {
    window.sessionStorage.setItem('isLoggedIn', loginData);

    if (loginData === 'admin@admin.com') {
      this.isAdmin = true;
      this.isLoggedIn = true;
    } else if (loginData) {
      this.isAdmin = false;
      this.isLoggedIn = true;
    } else {
      this.isAdmin = false;
      this.isLoggedIn = false;
    }
  }

  logout(): void {
    window.sessionStorage.removeItem('isLoggedIn');
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/home');
    this.isAdmin = false;
  }

  toggleEndNav(): void {
    this.endNav.toggle();
  }

  sendPushMsg(movieName, movieId, url): void {
    this.alertService.sendPushNotification(movieName, 'Reminder about ' + movieName, url);
  }

  navigateTo(url): void {
    this.router.navigateByUrl(url.split('#')[1]);
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.fireSubscription) {
      this.fireSubscription.unsubscribe();
    }
  }
}
