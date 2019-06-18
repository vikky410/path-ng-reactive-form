import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Customer } from './customer';

function emailMatch(c: AbstractControl): {[key: string]: boolean} | null {
  const emailValue = c.get('email');
  const emailConfirmValue = c.get('confirmEmail');

  if (emailValue.pristine || emailConfirmValue.pristine) {
    return null;
  }
  if (emailValue === emailConfirmValue) {
    return null;
  }

  return {'match': true};
}

/**
 * @description returns true if validation rules are broken
 *
 * @param min number
 * @param max number
 *
 * @returns ValidatorFn
 */
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}
// function ratingRange(c: AbstractControl): {[key: string]: boolean} | null {
//   if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//     return {'range': true};
//   }

//   return null;
// }

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  emailMessages: string;

  private validationMessages = {
    required: 'Please enter your email address',
    email: 'Please enter a valid email address'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      phone: [''],
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required]
      }, {validator: emailMatch}),
      sendCatalog: true
    });
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(
      value => this.setEmailValidationMessage(emailControl)
    );
  }

  setEmailValidationMessage(c: AbstractControl): void {
    this.emailMessages = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessages = Object.keys(c.errors).map(
        key => this.emailMessages += this.validationMessages[key]
      ).join(' ');
    }
  }
  save() {
    // console.log(customerForm.form);
    // console.log('Saved: ' + JSON.stringify(customerForm.value));
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Vikas',
      lastName: 'Choudhary',
      email: 'test@email.com',
      sendCatalog: false
    });
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');

    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();
  }
}
