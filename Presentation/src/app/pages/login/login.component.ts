import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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

  constructor(private router: Router) { }

  ngOnInit() { }

  ngOnDestroy() { }

  public login(isValid, info) {
    if (isValid) {
      if (info.id === this.client.username && info.password === this.client.password) {
        localStorage.setItem('user-info', JSON.stringify(this.client));
        this.router.navigateByUrl('/client');
      } else if (info.id === this.employee.username && info.password === this.employee.password) {
        localStorage.setItem('user-info', JSON.stringify(this.employee));
        this.router.navigateByUrl('/employee');
      } else {
        this.showMsg('Login Error!', 'Invalid username or password', 'error');
      }
    }
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
