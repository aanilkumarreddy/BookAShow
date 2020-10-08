import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import { LoginService } from './../../../../core/services/login/login.service';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { MovieService } from './../../services/movie-service/movie.service';
import { MaterialModule } from './../../../../core/material-module/material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup } from '@angular/forms';
import { DISTANCE } from '../../constants/distance.constant';
import { GENRES } from '../../constants/genres.constant';
import { LANGUAGES } from '../../constants/languages.constant';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const movieList = [
    {
      id: 11,
      title: 'jhf',
      sub_title: 'jjuyf',
    },
    {
      id: 11,
      title: 'jhf',
      sub_title: 'jjuyf',
      theater: {
        fromDate: new Date(),
      },
    },

    {
      id: 11,
      title: 'jhf',
      sub_title: 'jjuyf',
      theater: {
        latitude: 12.4353,
        longitude: 82.54353,
        fromDate: new Date(),
        distance: 5.2,
      },
    },
  ];
  const promRej = Promise.reject({});
  const movieServiceStub = {
    getMovieList: () => {
      return Promise.resolve(movieList);
    },
    getPosition: () => {
      return Promise.resolve({
        lat: 12.635543,
        lng: 82.646554,
      });
    },
  };

  const mapsLoaderStub = {
    load: () => {
      return Promise.resolve({});
    },
  };

  const manualSpinnyStub = {
    spin$: new Subject(),
  };
  const data = from([{ id: 1, name: '' }]);

  const objectFireDb = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
    update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
  };
  const fireDbStub = {
    object: jasmine.createSpy('object').and.returnValue(objectFireDb),
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
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MaterialModule, BrowserAnimationsModule, AgmCoreModule],
      providers: [
        {
          provide: MovieService,
          useValue: movieServiceStub,
        },
        {
          provide: MapsAPILoader,
          useValue: mapsLoaderStub,
        },
        {
          provide: ManualSpinnyService,
          useValue: manualSpinnyStub,
        },
        {
          provide: AngularFireDatabase,
          useValue: fireDbStub,
        },
        {
          provide: LoginService,
          useValue: loginStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.movieListDataSource = new MatTableDataSource(movieList);
    component.filterForm = new FormGroup({
      searchText: new FormControl(''),
      language: new FormControl(LANGUAGES),
      genre: new FormControl(GENRES),
      distance: new FormControl(DISTANCE[0]),
    });
    component.filterForm.patchValue({
      searchText: 'a',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sholud test value changes method ', () => {
    const form = component.filterForm.getRawValue();
    component.filterForm.patchValue(
      {
        searchText: 'j',
        distance: 10,
      },
      { emitEvent: true }
    );
    expect(form.searchText).toBeDefined();
  });

  it('Sholud test getState method ', () => {
    expect(component.getState).toBeDefined();
    spyOn(component, 'getState').and.callThrough();
    component.getState(movieList[0], 'b');
    expect(component.getState).toHaveBeenCalled();
  });

  it('calls ngOnDestroy method', () => {
    component.loginSubscription = new Subscription();
    component.fireSubscription = new Subscription();
    component.valueChangesSubscription = new Subscription();
    spyOn(component.loginSubscription, 'unsubscribe');
    spyOn(component.fireSubscription, 'unsubscribe');
    spyOn(component.valueChangesSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.loginSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.fireSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.valueChangesSubscription.unsubscribe).toHaveBeenCalled();
  });
});
