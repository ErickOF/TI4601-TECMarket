import { Component, OnInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private client = {
    id: 'CErickOF',
    password: '1234'
  };
  private employee = {
    id: 'EErickOF',
    password: '1234'
  };

  constructor() {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public login(isValid, info) {
    if (isValid) {
      if (info.id === this.client.id && info.password === this.client.password) {
        console.log('Client');
      } else if (info.id === this.employee.id && info.password === this.employee.password) {
        console.log('Employe');
      } else {
        this.showMsg('Login Error!', 'Invalid username or password', 'error');
      }
    }
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
