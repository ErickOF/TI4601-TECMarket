import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userinfo;

  constructor() {
    this.userinfo = JSON.parse(localStorage.getItem('user-info'));
  }

  ngOnInit() {
  }

}
