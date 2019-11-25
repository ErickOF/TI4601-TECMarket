import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Store } from './../../../models/store';

declare var $: any;


declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, AfterViewInit {
  public supermarkets: Store[];
  public table: DataTable;

  constructor(private router: Router) {
    this.createTable();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.table = $('#datatable').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [
        [10, 25, 50, -1],
        [10, 25, 50, 'All']
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Buscar',
      },
    });
  }

  private createTable() {
    this.supermarkets = [
      {
        '_id': '5ddaf42ff7dfec26fca71ec9',
        'id_store': 'Store001',
        'name': 'store test fofo',
        'description': 'store test fofo description',
        'address': 'complete address',
        'lat': '100.17',
        'long': '400.35',
        'img': 'no image',
        'phone': '25518573',
        'rating': '5',
        'schedule': '5am to 5pm',
        'website': 'google.com',
        'products': [
          {
            '_id': '5ddaf42ff7dfec26fca71ecb',
            'product_code': 'P001',
            'name': 'P1',
            'description': 'no description',
            'price': '100',
            'photo': 'no photo',
            'createdAt': '2019-11-24T21:20:47.135Z',
            'updatedAt': '2019-11-24T21:20:47.135Z'
          },
          {
            '_id': '5ddaf42ff7dfec26fca71eca',
            'product_code': 'P002',
            'name': 'P2',
            'description': 'no description',
            'price': '200',
            'photo': 'no photo',
            'createdAt': '2019-11-24T21:20:47.135Z',
            'updatedAt': '2019-11-24T21:20:47.135Z'
          }
        ],
        'createdAt': '2019-11-24T21:20:47.135Z',
        'updatedAt': '2019-11-24T21:31:27.614Z',
        '__v': 0
      },
      {
        '_id': '5ddb2a1afee35239b0d9e273',
        'id_store': 'Store_NOSALES',
        'name': 'store test pato',
        'description': 'store test fofo description',
        'address': 'complete address',
        'lat': '100.17',
        'long': '400.35',
        'img': 'no image',
        'phone': '25518573',
        'rating': '5',
        'schedule': '5am to 5pm',
        'website': 'google.com',
        'products': [
          {
            '_id': '5ddb2a1afee35239b0d9e275',
            'product_code': 'P001',
            'name': 'P1',
            'description': 'no description',
            'price': '100',
            'photo': 'no photo',
            'createdAt': '2019-11-25T01:10:50.944Z',
            'updatedAt': '2019-11-25T01:10:50.944Z'
          },
          {
            '_id': '5ddb2a1afee35239b0d9e274',
            'product_code': 'P002',
            'name': 'P2',
            'description': 'no description',
            'price': '200',
            'photo': 'no photo',
            'createdAt': '2019-11-25T01:10:50.944Z',
            'updatedAt': '2019-11-25T01:10:50.944Z'
          }
        ],
        'createdAt': '2019-11-25T01:10:50.945Z',
        'updatedAt': '2019-11-25T01:10:50.945Z',
        '__v': 0
      },
      {
        _id: '5ddb2a1afee35239b0d9e271',
        id_store: 'Walmart',
        name: 'Walmart',
        description: 'Walmart Inc. is an American multinational retail corporation that operates a chain of hypermarkets, ' +
          'discount department stores, and grocery stores, headquartered in Bentonville, Arkansas. The company was founded ' +
          'by Sam Walton in 1962 and incorporated on October 31, 1969.',
        address: 'De la Basílica de los Ángeles 800m camino a Paraíso frente a la Bomba Los Ángeles, 10, Provincia de Cartago',
        phone: '1-800-925-6278',
        schedule: '9:00am-10:00pm',
        website: 'https://www.walmart.com/',
        rating: '0',
        lat: '9.867769',
        long: '-83.904424',
        img: '',
        products: [],
        createdAt: '',
        updatedAt: '',
        __v: 0
      }
    ];
  }

  public delete(row) {
    this.showMsg('Success!', 'Store was deleted', 'success');
  }

  public edit(row) {
    this.router.navigateByUrl('/employee/edit-supermarket');
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
