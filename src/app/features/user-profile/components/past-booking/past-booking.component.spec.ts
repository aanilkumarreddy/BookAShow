import { of, Subject, Subscription } from 'rxjs';
import { LoginService } from './../../../../core/services/login/login.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastBookingComponent } from './past-booking.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/core/material-module/material.module';
import { ManualSpinnyService } from 'src/app/core/services/manual-spinny/manual-spinny.service';

describe('PastBookingComponent', () => {
  let component: PastBookingComponent;
  let fixture: ComponentFixture<PastBookingComponent>;

  const data = of({ id: 1, name: '', mobile: 9154429081 });

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
      authState: {
        subscribe: (res, err) => {
          res(authState);
          err();
        },
      },
    },
  };

  const spinnyStub = {
    spin$: new Subject(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PastBookingComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ManualSpinnyService, useValue: spinnyStub },
        { provide: LoginService, useValue: loginStub },
        { provide: AngularFireDatabase, useValue: fireDbStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Sholud test parseBookings method ', () => {
    const bookingDetails = [
      {
        bookedFor: '09-30-2020',
      },
      {
        bookedFor: '10-30-2020',
      },
      {
        bookedFor: '08-30-2020',
      },
    ];
    expect(component.parseBookings).toBeDefined();
    spyOn(component, 'parseBookings').and.callThrough();
    component.parseBookings(bookingDetails);
    expect(component.parseBookings).toHaveBeenCalled();
  });
  it('calls ngOnDestroy method', () => {
    component.loginSubscription = new Subscription();
    component.fireSubscription = new Subscription();
    spyOn(component.loginSubscription, 'unsubscribe');
    spyOn(component.fireSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.loginSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.fireSubscription.unsubscribe).toHaveBeenCalled();
  });
});
