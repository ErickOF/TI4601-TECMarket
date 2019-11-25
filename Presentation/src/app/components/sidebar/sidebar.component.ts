import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' }
];

export const CLIENT: RouteInfo[] = [
  { path: '/icons', title: 'Buy', icon: 'ni-cart text-blue', class: '' },
  { path: '/icons', title: 'Purchase History', icon: 'ni-bullet-list-67 text-orange', class: '' },
  { path: '/client/view-supermarkets', title: 'View Stores', icon: 'ni-shop text-yellow', class: '' },
  { path: '/client/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' }
];

export const EMPLOYEE: RouteInfo[] = [
  { path: '/employee/add-supermarket', title: 'Add Store', icon: 'ni-shop text-blue', class: '' },
  { path: '/employee/view-supermarkets', title: 'View Stores', icon: 'ni-shop text-yellow', class: '' },
  { path: '/employee/stores-w-sales', title: 'Stores with sales', icon: 'ni-shop text-green', class: '' },
  { path: '/employee/top5-stores', title: 'Top 5 Stores', icon: 'ni-trophy text-yellow', class: '' },
  { path: '/employee/search-client', title: 'Search Client', icon: 'ni-single-02 text-orange', class: '' },
  { path: '/employee/similar-clients', title: 'Similar People', icon: 'ni-single-02 text-green', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    if (userInfo.rol === 3) {
      this.menuItems = CLIENT.filter(menuItem => menuItem);
    } else if (userInfo.rol === 1 || userInfo.rol === 2) {
      this.menuItems = EMPLOYEE.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
