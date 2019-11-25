import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userinfo;
  public defaultAvatar = 'assets/img/theme/avatar.png';

  constructor() {
    this.userinfo = JSON.parse(localStorage.getItem('user-info'));
  }

  ngOnInit() { }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }

  public update(isValid, form) {
    if (isValid) {
      this.showMsg('Success!', 'Your profile was updated!', 'success');
    }
  }
}
