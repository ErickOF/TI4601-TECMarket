import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Constants } from './../../config/constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public createClient(info) {
    return this.http.post<any>(Constants.url + Constants.createClient, info, this.httpOptions);
  }

  public getAllSales(user) {
    return this.http.get<any>(Constants.url + Constants.getAllSales + user, this.httpOptions);
  }
}
