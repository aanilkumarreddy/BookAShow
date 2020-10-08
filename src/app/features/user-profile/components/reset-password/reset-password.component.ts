import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { ResetPasswordService } from './../../services/reset-password/reset-password.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm: FormGroup;
  currentUser: any;
  loginSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private resetPasswordService: ResetPasswordService,
    private snackBarService: SnackBarService,
    private manualSpinnyService: ManualSpinnyService,
    private router: Router
  ) {
    this.manualSpinnyService.spin$.next(true);
    this.buildForm();
    this.getCurrentUser();
  }

  ngOnInit(): void {}

  buildForm(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        newConfirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
      },
      {
        validator: this.ConfirmPasswordValidator(
          'newPassword',
          'newConfirmPassword'
        ),
      }
    );
  }

  ConfirmPasswordValidator(
    controlName: string,
    matchingControlName: string
  ): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  getCurrentUser(): void {
    this.loginSubscription = this.loginService.afAuth.authState.subscribe(
      (res) => {
        this.currentUser = res;
        this.manualSpinnyService.spin$.next(false);
      }
    );
  }

  reAuthenticateUser(): void {
    this.manualSpinnyService.spin$.next(true);
    const formValue = this.resetPasswordForm.getRawValue();
    this.resetPasswordService
      .reauthenticateUser(
        this.currentUser,
        this.currentUser.email,
        formValue.oldPassword
      )
      .then((res) => {
        if (!res.user) {
          this.snackBarService.error('Given password is not correct');
          this.manualSpinnyService.spin$.next(false);
        } else {
          this.resetPassword(formValue.newPassword);
        }
      });
  }

  resetPassword(newPassword): void {
    this.resetPasswordService
      .resetPassword(this.currentUser, newPassword)
      .then((res) => {
        this.manualSpinnyService.spin$.next(false);
        if (!res) {
          this.snackBarService.success('Password changed successfully');
          this.router.navigateByUrl('user/userProfile');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
