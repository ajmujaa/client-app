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
    return this.http.post(AppConstants.DB, client);
  }

  getClients() {
    return this.http.get(AppConstants.DB)
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
    return this.http
      .put(AppConstants.DB, client)
      .map((response: Response) => {
        const data = response.json();
        return data;
      })
      .catch((error: Response) => {
        console.log('error', error);
        return Observable.throw(error);
      });
  }

}
