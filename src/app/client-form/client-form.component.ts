import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../shared/services/server.service';
import { ClientForm } from './client-form';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  @Input() client: any;

  clientForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required)
  });


  constructor(private server: ServerService) { }

  ngOnInit() {
  }

  reset() {
    this.client = null;
    this.clientForm.reset();
  }

  update(client) {
    const data = {};
    const form = this.clientForm.getRawValue();
    this.clientForm.patchValue({
      firstName: form.firstName || client.firstName,
      lastName: form.lastName || client.lastName,
      phone: form.phone || client.phone,
      city: form.city || client.city,
      zip: form.zip || client.zip,
      street: form.street || client.street
    });
    data[client.key] = {...this.clientForm.getRawValue()};
    this.server.updateClient(data).subscribe(
      (response) => { this.reset(); console.log(response); },
      (error) => console.log(error)
    );
  }

  save() {
    const data = this.clientForm.getRawValue();
    const client = new ClientForm(data.firstName, data.lastName, data.phone, data.city, data.street, data.zip);
    this.server.addClient(client).subscribe(
      (response) => {
        if (response.status === 200) {
          this.clientForm.reset();
        }
      },
      (error) => console.log(error)
    );
  }

}
