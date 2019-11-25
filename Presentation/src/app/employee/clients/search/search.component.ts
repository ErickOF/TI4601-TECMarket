import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

import { StoreService } from './../../../services/store/store.service';


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
  public clients;
  public table: DataTable;
  public ready = false;

  constructor(private storeService: StoreService) {
    this.clients = [
      {
        user_id: '123456789',
        name: 'Pato Test User'
      },
      {
        user_id: 'fofo123',
        name: 'Rodolfo Solano'
      },
      {
        user_id: '305070987',
        name: 'Erick Andrés Obregón Fonseca'
      },
    ];
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

  public selectClient(user) {
    this.ready = false;
    const response = this.storeService.getUserSales(user);
    response.subscribe((data) => {
      this.sales = data.data;
      this.ready = true;
    }, (error) => {
      this.showMsg('Connection Error!', 'Try it later!', 'error');
    });
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
