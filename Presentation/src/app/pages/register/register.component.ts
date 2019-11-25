import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from './../../services/user/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() { }

  public register(isValid, info) {
    if (isValid) {
      const userInfo = {
        user_id: info.id,
        id_rol: 3,
        password: info.password,
        name: info.name,
        username: info.username,
        birth: info.birthday,
        phone: info.phone,
        email: info.email
      };

      const response = this.userService.createClient(userInfo);
      response.subscribe((data) => {
        if (data.message) {
          this.showMsg('Register Error!', data.msg, 'error');
        } else {
          this.showMsg('Success!', 'User was created', 'success');
          this.router.navigateByUrl('/login');
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
