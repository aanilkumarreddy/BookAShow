import { ManualSpinnyService } from './../../../../core/services/manual-spinny/manual-spinny.service';
import { SnackBarService } from './../../../../shared/services/snack-bar/snack-bar.service';
import { LoginService } from './../../../../core/services/login/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBarService: SnackBarService,
    private router: Router,
    private manualSpinnyService: ManualSpinnyService,
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  sendPasswordResetMail(): void {
    this.manualSpinnyService.spin$.next(true);
    const email = this.forgotPasswordForm.getRawValue().email;
    this.loginService.forgotPassword(email).then((res) => {
      if (!res) {
        this.snackBarService.success('Password Reset Mail sent to ' + email);
        this.router.navigateByUrl('/home');
      } else {
        this.snackBarService.error('No User found for ' + email + '. Please signup to Continue.');
      }
      this.manualSpinnyService.spin$.next(false);
    });
  }
}
