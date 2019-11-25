import { Component, OnInit } from '@angular/core';

import { UserService } from './../../services/user/user.service'

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  public purchases;
  public Amount_of_the_order = [];
  public amount = 0;
  public id;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('user-info')).user_id;
    this.loadPurchases();
  }

  loadPurchases() {
    const response = this.userService.getAllSales(this.id);
    response.subscribe((data) => {
      this.purchases = data.resp;
      console.log(data);
      this.AmountOfTheOrder();
    });
  }

  AmountOfTheOrder() {
    this.purchases.forEach(element => {
      element['products'].forEach(products => {
        console.log(Number(products['total_price']));

        this.amount += Number(products['total_price']);
      });
      this.Amount_of_the_order.push(this.amount);
    });

  }


}
