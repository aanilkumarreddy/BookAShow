import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { AlertService } from 'src/app/features/movie/services/alert-service/alert.service';
import { MovieService } from 'src/app/features/movie/services/movie-service/movie.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';
import { MaterialModule } from '../../material-module/material.module';
import { LoginService } from '../../services/login/login.service';
import { ManualSpinnyService } from '../../services/manual-spinny/manual-spinny.service';

import { HeaderComponent } from './header.component';
import { MatSidenav } from '@angular/material/sidenav';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const spinnyStub = {
    spin$: new Subject(),
  };

  const movieDetail = {
    id: 11,
    imdbId: 232132,
    theater: {
      fromDate: '09-10-2020',
      toDate: '10-31-2020',
    },
  };

  const data = of({
    id: 1,
    alerts: [
      {
        date: '09-30-2020',
        movieId: 20,
        movieName: 'RRR',
        url: 'http://localhost:4200/#/home/movieDetail?movieId=20',
      },
    ],
  });

  const objectFireDb = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
  };
  const fireDbStub = {
    object: jasmine.createSpy('object').and.returnValue(objectFireDb),
  };

  const routerStub = {
    navigate: (path) => {},
    navigateByUrl: (url) => {},
  };

  const routeStub = {
    queryParams: of({ movieId: '11' }),
  };

  const movieStub = {
    getMovieById: (id) => {
      return Promise.resolve(movieDetail);
    },
    getImdbMovieDetails: (id) => ({
      subscribe: (res, err, fin) => {
        res(movieDetail), err({}), fin();
      },
    }),
  };

  const alertStub = {
    updateAlert: (alertDetails, uid) => {
      return Promise.resolve({});
    },
    receiveMessage: () => {},
    currentMessage: of({
      notification: 'jhhgfhf',
    }),
    requestPermission: (uid) => {},
    sendPushNotification: (arg1, arg2, arg3) => {},
  };

  const snackBarStub = {
    error: (msg) => {},
    success: (msg) => {},
  };

  const authState = {
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
  };
  const loginStub = {
    afAuth: {
      authState: of(authState),
    },
    logout: () => {},
  };
  const matDialogAfter = {
    afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of('admin@admin.com')),
  };
  const matDialogStub = {
    open: jasmine.createSpy('open').and.returnValue(matDialogAfter),
  };
  const sideNavStub = {
    toggle: () => {},
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
      providers: [
        {
          provide: ManualSpinnyService,
          useValue: spinnyStub,
        },
        {
          provide: Router,
          useValue: routerStub,
        },
        {
          provide: MovieService,
          useValue: movieStub,
        },
        {
          provide: ActivatedRoute,
          useValue: routeStub,
        },
        {
          provide: SnackBarService,
          useValue: snackBarStub,
        },
        {
          provide: AlertService,
          useValue: alertStub,
        },
        {
          provide: LoginService,
          useValue: loginStub,
        },
        {
          provide: AngularFireDatabase,
          useValue: fireDbStub,
        },
        { provide: MatDialog, useValue: matDialogStub },
        { provide: MatSidenav, useValue: sideNavStub },

        DatePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sholud test logout method ', () => {
    expect(component.logout).toBeDefined();
    spyOn(component, 'logout').and.callThrough();
    component.logout();
    expect(component.logout).toHaveBeenCalled();
  });
  it('Sholud test changeTheme method ', () => {
    expect(component.changeTheme).toBeDefined();
    spyOn(component, 'changeTheme').and.callThrough();
    component.changeTheme();
    expect(component.changeTheme).toHaveBeenCalled();
  });
  it('Sholud test login method ', () => {
    expect(component.login).toBeDefined();
    spyOn(component, 'login').and.callThrough();
    component.login();
    expect(component.login).toHaveBeenCalled();
  });
  it('Sholud test navigateTo method ', () => {
    expect(component.navigateTo).toBeDefined();
    spyOn(component, 'navigateTo').and.callThrough();
    component.navigateTo('');
    expect(component.navigateTo).toHaveBeenCalled();
  });
  it('calls ngOnDestroy method', () => {
    component.loginSubscription = new Subscription();
    component.fireSubscription = new Subscription();
    component.alertSubscription = new Subscription();
    spyOn(component.loginSubscription, 'unsubscribe');
    spyOn(component.fireSubscription, 'unsubscribe');
    spyOn(component.alertSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.loginSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.fireSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.alertSubscription.unsubscribe).toHaveBeenCalled();
  });
});
