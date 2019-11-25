import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var $: any;


declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-stores-w-purchases',
  templateUrl: './stores-w-purchases.component.html',
  styleUrls: ['./stores-w-purchases.component.scss']
})
export class StoreWPurchasesComponent implements OnInit, AfterViewInit {
  public supermarkets: any[];
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
    this.supermarkets = ['STORE_NOSALES', 'Store001'];
  }
}
