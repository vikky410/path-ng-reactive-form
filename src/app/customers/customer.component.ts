import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor() { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)
    });
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
