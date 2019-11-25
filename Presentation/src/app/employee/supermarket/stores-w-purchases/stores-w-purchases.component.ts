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
    this.supermarkets = [
      {
        localName: 'Walmart',
        description: 'Walmart Inc. is an American multinational retail corporation that operates a chain of hypermarkets, ' +
          'discount department stores, and grocery stores, headquartered in Bentonville, Arkansas. The company was founded ' +
          'by Sam Walton in 1962 and incorporated on October 31, 1969.',
        address: 'De la Basílica de los Ángeles 800m camino a Paraíso frente a la Bomba Los Ángeles, 10, Provincia de Cartago',
        phone: '1-800-925-6278',
        schedule: '9:00am-10:00pm',
        website: 'https://www.walmart.com/',
        rating: 0,
        latitude: 9.867769,
        longitude: -83.904424
      }
    ];
  }

  public delete(row) {
    this.showMsg('Success!', 'Supermarket was deleted', 'success');
  }

  public edit(row) {
    this.router.navigateByUrl('/employee/edit-supermarket');
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
