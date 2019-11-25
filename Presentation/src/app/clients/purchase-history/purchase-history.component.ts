import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {



  purchases = [
    {
      "need": [
        "fragil",
        "fast delivery"
      ],
      "_id": "5ddb0c6bb5db6733c4f5ab00",
      "id_sale": "Sale003",
      "id_store": "Store001",
      "id_user": "fofo123",
      "datetime": "2019-01-01 12:00:00",
      "state": "Registrado",
      "products": [
        {
          "_id": "5ddb0c6bb5db6733c4f5ab02",
          "product_code": "P003",
          "quantity": "10",
          "total_price": "1000"
        },
        {
          "_id": "5ddb0c6bb5db6733c4f5ab01",
          "product_code": "P004",
          "quantity": "10",
          "total_price": "2000"
        }
      ],
      "products_name": [
        "Cafe Rey",
        "Azucar Doña María"
      ],
      "createdAt": "2019-11-24T23:04:11.566Z",
      "updatedAt": "2019-11-24T23:04:11.566Z",
      "__v": 0
    },
    {
      "need": [
        ""
      ],
      "_id": "5ddb0cd332fa8731486952e0",
      "id_sale": "Sale004",
      "id_store": "Store001",
      "id_user": "fofo123",
      "datetime": "2019-01-01 12:00:00",
      "state": "Registrado",
      "products": [
        {
          "_id": "5ddb0cd332fa8731486952e2",
          "product_code": "P005",
          "quantity": "10",
          "total_price": "1000"
        },
        {
          "_id": "5ddb0cd332fa8731486952e1",
          "product_code": "P006",
          "quantity": "10",
          "total_price": "2000"
        }
      ],
      "products_name": [
        "Frijoles Don Pedro",
        "Salsa Lizano",
        "Arroz Tio Pelo"
      ],
      "createdAt": "2019-11-24T23:05:55.813Z",
      "updatedAt": "2019-11-24T23:05:55.813Z",
      "__v": 0
    },
    {
      "need": [
        "fragil"
      ],
      "_id": "5ddb0e5d31d41a1744ce5bcf",
      "id_sale": "Sale005",
      "id_store": "Store001",
      "id_user": "fofo123",
      "datetime": "2019-01-01 12:00:00",
      "state": "Registrado",
      "products": [
        {
          "_id": "5ddb0e5d31d41a1744ce5bd1",
          "product_code": "P007",
          "quantity": "10",
          "total_price": "1000"
        },
        {
          "_id": "5ddb0e5d31d41a1744ce5bd0",
          "product_code": "P008",
          "quantity": "10",
          "total_price": "2000"
        }        
      ],
      "products_name": [
        "Atun Saldimar",
        "Mortadela Cinta Azul"
      ],
      "createdAt": "2019-11-24T23:12:29.519Z",
      "updatedAt": "2019-11-24T23:12:29.519Z",
      "__v": 0
    },
  ]



  constructor() { }

  ngOnInit() {
    this.AmountOfTheOrder();
  }


  Amount_of_the_order = [];

  amount = 0;
  AmountOfTheOrder() {
    
    this.purchases.forEach(element => {
      element['products'].forEach(products => {
        console.log(Number(products['total_price']));
        
        this.amount +=  Number(products['total_price']);        
      });
      this.Amount_of_the_order.push(this.amount);
    });

  }


}
