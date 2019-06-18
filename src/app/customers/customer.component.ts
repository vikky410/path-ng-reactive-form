import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      sendCatalog: true
    });
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });
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
}
