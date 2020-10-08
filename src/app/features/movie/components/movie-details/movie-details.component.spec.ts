import { DatePipe } from '@angular/common';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertService } from './../../services/alert-service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from, of, Subject, Subscription } from 'rxjs';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../core/material-module/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { MovieService } from '../../services/movie-service/movie.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';
import { LoginService } from 'src/app/core/services/login/login.service';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

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

  const data = from([{ id: 1, name: '' }]);

  const objectFireDb = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
  };
  const fireDbStub = {
    object: jasmine.createSpy('object').and.returnValue(objectFireDb),
  };

  const routerStub = {
    navigate: (path) => {},
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
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
      ],
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
        DatePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test addAlert method ', () => {
    const date = new Date();
    component.movieDetails = movieDetail;
    expect(component.addAlert).toBeDefined();
    spyOn(component, 'addAlert').and.callThrough();
    component.addAlert(date);
    expect(component.addAlert).toHaveBeenCalled();
  });
  it('Sholud test proceed method ', () => {
    component.movieDetails = movieDetail;
    expect(component.proceed).toBeDefined();
    spyOn(component, 'proceed').and.callThrough();
    component.proceed();
    expect(component.proceed).toHaveBeenCalled();
  });
  it('Sholud test getImagePath method ', () => {
    const movieDetails = {
      poster_url: 'dsf',
    };
    expect(component.getImagePath).toBeDefined();
    spyOn(component, 'getImagePath').and.callThrough();
    component.getImagePath(movieDetails);
    expect(component.getImagePath).toHaveBeenCalled();
  });
  it('Sholud test shareMovie method ', () => {
    const movieDetails = {
      poster_url: 'dsf',
    };
    navigator.share = () => {
      return Promise.resolve();
    };
    expect(component.shareMovie).toBeDefined();
    spyOn(component, 'shareMovie').and.callThrough();
    component.shareMovie(movieDetails);
    expect(component.shareMovie).toHaveBeenCalled();
  });
  it('calls ngOnDestroy method', () => {
    component.loginSubscription = new Subscription();
    component.fireSubscription = new Subscription();
    component.routerSubscription = new Subscription();
    component.movieSubscription = new Subscription();
    spyOn(component.loginSubscription, 'unsubscribe');
    spyOn(component.fireSubscription, 'unsubscribe');
    spyOn(component.routerSubscription, 'unsubscribe');
    spyOn(component.movieSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.loginSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.fireSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.routerSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.movieSubscription.unsubscribe).toHaveBeenCalled();
  });
});
