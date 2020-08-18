import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-payment-handler',
  templateUrl: './payment-handler.component.html',
  styleUrls: ['./payment-handler.component.scss'],
})
export class PaymentHandlerComponent implements OnInit {
  creditForm: FormGroup;
  savedForm: any;

  years = [
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
    2031,
    2032,
    2033,
    2034,
    2035,
  ];

  upis = [
    {
      value: 'gPay',
      name: 'Google pay',
    },
    {
      value: 'phonePe',
      name: 'Phone pe',
    },
    {
      value: 'others',
      name: 'Other Upis',
    },
  ];

  showOtherUpiField = false;

  constructor(protected fb: FormBuilder) {
    this.creditForm = this.fb.group({
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      cardCode: ['', this.validateCreditCard],
    });

    // Save the initial value of the form
    this.savedForm = this.creditForm.value;
  }

  ngOnInit(): void {}

  // Essentially the same logic as directive but in-line
  validateCreditCard(control: FormControl): ValidationErrors {
    console.log(control);
    let result: ValidationErrors;
    const value = control.value || '';
    if (
      !(
        value.startsWith('37') ||
        value.startsWith('4') ||
        value.startsWith('5')
      )
    ) {
      // Return error if card is not Amex, Visa or Mastercard
      result = {
        creditCard:
          'Credit/Debit ard number is not from a supported credit card provider',
      };
    } else if (value.length !== 16) {
      console.log(value);
      // Return error if length is not 16 digits
      result = {
        creditCard: 'Credit/Debit card number must be 16-digit long',
      };
    } else if (!/^\d+$/.test(value)) {
      result = {
        creditCard: 'Credit/Debit card number should contain numbers',
      };
    } else {
      result = {};
    }
    console.log(result);
    return result;
  }

  radioChange(e): void {
    console.log(e);
    if (e.value.value === 'others') {
      this.showOtherUpiField = true;
    } else {
      this.showOtherUpiField = false;
    }
  }
}
