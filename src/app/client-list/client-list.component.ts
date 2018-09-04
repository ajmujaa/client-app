import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { ServerService } from '../shared/services/server.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, DoCheck {
  clients: any;
  @Output() selectedClient = new EventEmitter<any>();

  constructor(private server: ServerService) {}

  ngOnInit() {
    this.getClients();
  }

  ngDoCheck() {
    // this.getClients();
  }

  getClients() {
    this.server.getClients().subscribe(
      data => {
        const snapshotToArray = () =>
          Object.entries(data).map(e => Object.assign(e[1], { key: e[0] }));
        this.clients = snapshotToArray();
      },
      error => console.log(error)
    );
  }

  edit(client) {
    this.selectedClient.emit(client);
  }
}
