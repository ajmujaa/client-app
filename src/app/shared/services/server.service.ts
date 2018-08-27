import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ClientForm } from '../../client-form/client-form';
import { AppConstants } from '../../app-constants.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {

  constructor(private http: Http) { }

  addClient(client: ClientForm) {
    return this.http.post(AppConstants.DB + 'data.json', client);
  }

  getClients() {
    return this.http.get(AppConstants.DB + 'data.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }

  updateClient(client: any) {
    const url = AppConstants.DB + '/data.json';
    console.log(url);
    return this.http.put(url, client)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => { console.log('error', error);
          return Observable.throw(error);
        }
      );
  }

}
