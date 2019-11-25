import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Constants } from './../../config/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public login(userInfo) {
    return this.http.post<any>(Constants.url + Constants.login, userInfo, this.httpOptions);
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem('_id') != null;
  }

  public setToken(user) {
    sessionStorage.setItem('_id', user);
  }

  public setRole(role) {
    sessionStorage.setItem('role', role);
  }

  public getRole() {
    return sessionStorage.getItem('role');
  }

  public setUser(data) {
    sessionStorage.setItem('user-info', data);
  }

  public getToken() {
    return sessionStorage.getItem('_id');
  }

  public getUserInfo() {
    return sessionStorage.getItem('user-info');
  }
}
