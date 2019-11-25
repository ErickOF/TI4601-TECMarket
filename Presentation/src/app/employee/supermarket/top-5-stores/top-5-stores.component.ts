import { Component, OnInit, AfterViewInit } from '@angular/core';

import { StoreService } from './../../../services/store/store.service';


declare var $: any;

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-top-5-stores',
  templateUrl: './top-5-stores.component.html',
  styleUrls: ['./top-5-stores.component.scss']
})
export class Top5StoresComponent implements OnInit, AfterViewInit {
  public supermarkets: any[];
  public table: DataTable;

  constructor(private storeService: StoreService) {
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
  public sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
    };
}

  private createTable() {
    const response = this.storeService.getTop5();
    response.subscribe((data) => {
      
      this.supermarkets = data;
      this.supermarkets.sort(this.sortByProperty('sales'))
      console.log(this.supermarkets)
    });
  }

  
}
