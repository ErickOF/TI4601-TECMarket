import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from './../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private client = {
    username: 'CErickOF',
    name: 'Erick Obregon',
    id: 3050709876,
    phone: 87134265,
    birthday: '1998-01-31',
    email: 'erickobregonf@gmail.com',
    password: '1234',
    img: 'assets/img/theme/profile1.jpg',
    rol: 'client'
  };

  private employee = {
    username: 'EErickOF',
    name: 'Erick Obregon',
    id: 3050709876,
    phone: 87134265,
    birthday: '1998-01-31',
    email: 'erickobregonf@gmail.com',
    password: '1234',
    rol: 'employee'
  };

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() { }

  ngOnDestroy() { }

  public login(isValid, info) {
    if (isValid) {
      const userInfo = {
        username: info.id,
        password: info.password
      };

      const response = this.authService.login(userInfo);
      response.subscribe((data) => {
        if (data.message) {
          this.showMsg('Login Error!', data.msg, 'error');
        } else if (data.jsonResponse) {
          const user = data.jsonResponse;
          localStorage.setItem('user-info', JSON.stringify(user));
          if (user.rol === 3) {
            this.router.navigateByUrl('/client');
          } else {
            this.router.navigateByUrl('/employee');
          }
        } else {
          this.showMsg('Login Error!', 'Unknown error', 'error');
        }
      }, (error) => {
          this.showMsg('Connection Error!', 'Try it later!', 'error');
      });
    }
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
