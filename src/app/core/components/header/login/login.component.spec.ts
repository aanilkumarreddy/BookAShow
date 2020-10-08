import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { MaterialModule } from 'src/app/core/material-module/material.module';
import { LoginService } from 'src/app/core/services/login/login.service';
import { ManualSpinnyService } from 'src/app/core/services/manual-spinny/manual-spinny.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authState = {
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
  };
  const loginStub = {
    afAuth: {
      authState: of(authState),
    },
    loginWithGoogle: () => {
      return Promise.resolve({
        user: {
          email: 'aabb@gmail.com',
        },
      });
    },
    signupWithEmail: (email, pwd, name) => {
      return Promise.resolve({
        code: 'auth/jdjds',
      });
    },
    loginWithEmail: (email, pwd) => {
      return Promise.resolve({});
    },
  };
  const routerStub = {
    navigateByUrl: (url) => {},
  };
  const spinnyStub = {
    spin$: new Subject(),
  };
  const snackStub = {
    success: (msg) => {},
    error: (msg) => {},
  };

  const matDialogRefStub = {
    close: (arg1?) => {},
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: LoginService, useValue: loginStub },
        { provide: ManualSpinnyService, useValue: spinnyStub },
        { provide: SnackBarService, useValue: snackStub },
        { provide: MatDialogRef, useValue: matDialogRefStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test googleLogin method ', () => {
    expect(component.googleLogin).toBeDefined();
    spyOn(component, 'googleLogin').and.callThrough();
    component.googleLogin();
    expect(component.googleLogin).toHaveBeenCalled();
  });
  it('Sholud test closeDialog method ', () => {
    expect(component.closeDialog).toBeDefined();
    spyOn(component, 'closeDialog').and.callThrough();
    component.closeDialog();
    expect(component.closeDialog).toHaveBeenCalled();
  });
  it('Sholud test signUp method ', () => {
    expect(component.signUp).toBeDefined();
    spyOn(component, 'signUp').and.callThrough();
    component.signUp();
    expect(component.signUp).toHaveBeenCalled();
  });
  it('Sholud test loginWithEmail method ', () => {
    component.loginForm.patchValue({
      email: 'admin@admin.com',
      password: 'admin12345',
    });
    expect(component.loginWithEmail).toBeDefined();
    spyOn(component, 'loginWithEmail').and.callThrough();
    component.loginWithEmail();
    expect(component.loginWithEmail).toHaveBeenCalled();
  });
  it('Sholud test loginWithEmail method ', () => {
    component.loginForm.patchValue({
      email: 'aanil@gmail.com',
      password: 'anil',
    });
    expect(component.loginWithEmail).toBeDefined();
    spyOn(component, 'loginWithEmail').and.callThrough();
    component.loginWithEmail();
    expect(component.loginWithEmail).toHaveBeenCalled();
  });
});
