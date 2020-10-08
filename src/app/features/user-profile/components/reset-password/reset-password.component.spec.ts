import { Router } from '@angular/router';
import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { ResetPasswordService } from './../../services/reset-password/reset-password.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { of, Subject, Subscription } from 'rxjs';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/core/material-module/material.module';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  const spinnyStub = {
    spin$: new Subject(),
  };
  const authState = {
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
  };
  const loginStub = {
    afAuth: {
      authState: of(authState),
    },
  };

  const snackBarStub = {
    error: () => {},
    success: () => {},
  };

  const routerStub = {};
  const resetPwdStub = {
    reauthenticateUser: (arg1, arg2, arg3) => {
      return Promise.resolve({
        user: {
          uid: '1wreFEfefeuih',
        },
      });
    },
    resetPassword: (arg1, arg2) => {
      return Promise.resolve({});
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
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
        { provide: ResetPasswordService, useValue: resetPwdStub },
        { provide: SnackBarService, useValue: snackBarStub },
        { provide: Router, useValue: routerStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test reAuthenticateUser method ', () => {
    expect(component.reAuthenticateUser).toBeDefined();
    spyOn(component, 'reAuthenticateUser').and.callThrough();
    component.reAuthenticateUser();
    expect(component.reAuthenticateUser).toHaveBeenCalled();
  });

  it('calls ngOnDestroy method', () => {
    component.loginSubscription = new Subscription();
    spyOn(component.loginSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.loginSubscription.unsubscribe).toHaveBeenCalled();
  });
});
