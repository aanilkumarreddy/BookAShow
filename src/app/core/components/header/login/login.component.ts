import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
    });
    // this.signUpForm = this.fb.group(
    //   {
    //     name: ['', [Validators.required]],
    //     email: ['', [Validators.required, Validators.email]],
    //     password: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.minLength(6),
    //         Validators.maxLength(15),
    //       ],
    //     ],
    //     confirmPassword: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.minLength(6),
    //         Validators.maxLength(15),
    //       ],
    //     ],
    //   },
    //   {
    //     validator: this.ConfirmPasswordValidator('password', 'confirmPassword'),
    //   }
    // );
    console.log(this.signUpForm);
  }

  ngOnInit(): void {}

  ConfirmPasswordValidator(
    controlName: string,
    matchingControlName: string
  ): any {
    return (formGroup: FormGroup) => {
      console.log(formGroup);
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
}
