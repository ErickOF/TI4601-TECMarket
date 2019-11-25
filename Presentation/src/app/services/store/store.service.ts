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

  public createStore(store) {
    return this.http.post<any>(Constants.url + Constants.createStore, store, this.httpOptions);
  }

  public deleteStore(store) {
    return this.http.delete<any>(Constants.url + Constants.deleteStore + store, this.httpOptions);
  }

  public getAllStores() {
    return this.http.get<any>(Constants.url + Constants.allStores, this.httpOptions);
  }

  public getAllStoresWSales() {
    return this.http.get<any>(Constants.url + Constants.allStoresWSales, this.httpOptions);
  }

  public getTop5() {
    return this.http.get<any>(Constants.url + Constants.getTop5, this.httpOptions);
  }
}
