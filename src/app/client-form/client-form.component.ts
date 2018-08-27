import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../shared/services/server.service';
import { ClientForm } from './client-form';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit, DoCheck {

  @Input() client: any;
  updateClient: any;

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

  ngDoCheck() {
    this.updateClient = this.client;
  }

  update(client) {
    this.server.updateClient(client).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  reset() {
    this.client = null;
    this.clientForm.reset();
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
