import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public location: Location;
  public userInfo;
  public avatar = 'assets/img/theme/admin.png';

  constructor(location: Location) {
    this.location = location;
    this.userInfo = JSON.parse(localStorage.getItem('user-info'));
  }

  ngOnInit() { }

}
