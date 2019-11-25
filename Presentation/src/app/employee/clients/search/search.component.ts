import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';


declare var $: any;

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  public sales;
  public table: DataTable;

  constructor() {
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
    this.sales = [/*
      {
        id_sale: 'Sale006',
        store: 'Store001',
        date: '2019-01-01 12:00:00'
      },
      {
        id_sale: 'Sale007',
        store: 'Store001',
        date: '2019-01-01 12:00:00'
      },
      {
        id_sale: 'Sale008',
        store: 'Store001',
        date: '2019-01-01 12:00:00'
      },
      {
        id_sale: 'Sale010',
        store: 'Store_NOSALES',
        date: '2019-01-01 12:00:00'
      },
      {
        id_sale: 'Sale003',
        store: 'Store001',
        date: '2019-01-01 12:00:00'
      },
      {
        id_sale: 'Sale004',
        store: 'Store001',
        date: '2019-01-01 12:00:00'
      },
      {
        id_sale: 'Sale005',
        store: 'Store001',
        date: '2019-01-01 12:00:00'
      }*/
      /*
      {
        store: 'Store test pato',
        sales: 1
      },
      {
        store: 'Store test foto',
        sales: 7
      }*/
      {
        user_id: '123456789',
        name: 'Pato Test User'
      },
      {
        user_id: 'fofo123',
        name: 'Rodolfo Solano'
      }
    ];
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
