import { Router } from '@angular/router';
import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { LoginService } from './../../../../core/services/login/login.service';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/core/material-module/material.module';
import { ManualSpinnyService } from 'src/app/core/services/manual-spinny/manual-spinny.service';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  const spinnyStub = {
    spin$: new Subject(),
  };
  const routerStub = {
    navigateByUrl: (url) => {},
  };
  const snackBarStub = {
    success: (msg) => {},
    error: (msg) => {},
  };
  const loginStub = {
    forgotPassword: (email) => {
      return Promise.resolve({});
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
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
        { provide: SnackBarService, useValue: snackBarStub },
        { provide: Router, useValue: routerStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Sholud test sendPasswordResetMail method ', () => {
    expect(component.sendPasswordResetMail).toBeDefined();
    spyOn(component, 'sendPasswordResetMail').and.callThrough();
    component.sendPasswordResetMail();
    expect(component.sendPasswordResetMail).toHaveBeenCalled();
  });
});
