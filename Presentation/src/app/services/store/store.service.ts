import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Constants } from './../../config/constants';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getAllStores() {
    return this.http.get<any>(Constants.url + Constants.allStores, this.httpOptions);
  }
}
