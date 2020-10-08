import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { LoginService } from './../../../../core/services/login/login.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  userData: any;
  loginSubscription: Subscription;
  fireSubscription: Subscription;
  isGoogleUser = false;

  constructor(
    private loginService: LoginService,
    private manualSpinnyService: ManualSpinnyService,
    private snackBarService: SnackBarService
  ) {
    this.manualSpinnyService.spin$.next(true);
    this.createUserForm();
    this.loginSubscription = this.loginService.afAuth.authState.subscribe(
      (res) => {
        if (res) {
          this.userData = res;
          this.getUserData(this.userData.uid);
        }
      },
      (err) => {
        console.log(err);
        this.manualSpinnyService.spin$.next(false);
      }
    );
  }

  ngOnInit(): void {}

  createUserForm(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      mobile: new FormControl(
        '',
        Validators.pattern(/^(?!0+$)(?:\(?\+\d{1,3}\)?[- ]?|0)?\d{10}$/)
      ),
    });
  }

  getUserData(uid): void {
    this.fireSubscription = this.loginService.db
      .object('users/' + uid)
      .valueChanges()
      .subscribe(
        (res: any) => {
          this.setFormData((res || {}).mobile);
        },
        (error) => {
          console.log(error);
          this.manualSpinnyService.spin$.next(false);
        }
      );
  }

  setFormData(mobileNumber): void {
    this.userForm.patchValue({
      email: this.userData.email,
      name: this.userData.displayName,
      mobile: mobileNumber,
    });
    this.disableFormFields();
  }

  disableFormFields(): void {
    if (
      this.userData &&
      this.userData.providerData[0].providerId === 'google.com'
    ) {
      this.userForm.get('name').disable();
      this.isGoogleUser = true;
    } else {
      this.isGoogleUser = false;
    }
    this.userForm.get('email').disable();
    this.manualSpinnyService.spin$.next(false);
  }

  updateProfile(): void {
    const formValue = this.userForm.getRawValue();
    if (this.userForm.get('name').dirty) {
      this.manualSpinnyService.spin$.next(true);
      this.loginService
        .updateDisplayName(this.userData, formValue.name)
        .then((res) => {
          this.snackBarService.success('Details Updated successfully');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.manualSpinnyService.spin$.next(false);
        });
    }
    if (this.userForm.get('mobile').dirty) {
      this.manualSpinnyService.spin$.next(true);
      this.loginService
        .updateMobileNum(formValue.mobile, this.userData.uid)
        .then((res) => {
          this.snackBarService.success('Details Updated successfully');
          this.manualSpinnyService.spin$.next(false);
        });
    }
  }

  OnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.fireSubscription) {
      this.fireSubscription.unsubscribe();
    }
  }
}
