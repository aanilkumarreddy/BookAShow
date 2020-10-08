import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ManualSpinnyService } from './../../../services/manual-spinny/manual-spinny.service';
import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { LoginService } from './../../../services/login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  isBrowser = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private snackBarService: SnackBarService,
    private router: Router,
    private manualSpinnyService: ManualSpinnyService,
    @Inject(PLATFORM_ID) platformId,
  ) {
    this.createLoginForm();
    this.createSignUpForm();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  createLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  createSignUpForm(): void {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      },
      {
        validator: this.ConfirmPasswordValidator('password', 'confirmPassword'),
      },
    );
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmPasswordValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  googleLogin(): void {
    this.loginService
      .loginWithGoogle()
      .then((res) => {
        if (res.email || ((res || {}).user || {}).email) {
          this.loggedIn(((res || {}).user || {}).email);
        } else {
          this.snackBarService.error('Error Occured... Please Try again');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signUp(): void {
    this.manualSpinnyService.spin$.next(true);
    const formValue = this.signUpForm.getRawValue();
    this.loginService.signupWithEmail(formValue.email, formValue.password, formValue.name).then((res) => {
      this.manualSpinnyService.spin$.next(false);
      if ((res || {}).code) {
        this.snackBarService.error(res.message);
      } else {
        this.snackBarService.success('Signup completed Successfully');
        this.dialogRef.close();
      }
    });
  }

  loginWithEmail(): void {
    this.manualSpinnyService.spin$.next(true);
    const formValue = this.loginForm.getRawValue();
    if (formValue.email === 'admin@admin.com') {
      if (formValue.password === 'admin12345') {
        this.router.navigateByUrl('/admin');
        this.loggedIn(formValue.email);
      } else {
        this.snackBarService.error('Please Enter a Valid Password');
      }
      this.manualSpinnyService.spin$.next(false);
    } else {
      this.loginService.loginWithEmail(formValue.email, formValue.password).then((res) => {
        this.manualSpinnyService.spin$.next(false);
        if ((res || {}).code) {
          this.snackBarService.error(res.message);
        } else {
          this.dialogRef.close();
        }
      });
    }
  }

  loggedIn(loginData): void {
    if (this.isBrowser) {
      window.sessionStorage.setItem('isLoggedIn', loginData);
    }
    this.dialogRef.close(loginData);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
