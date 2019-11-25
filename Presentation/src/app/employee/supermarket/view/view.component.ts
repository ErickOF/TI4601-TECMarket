import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Store } from './../../../models/store';
import { StoreService } from './../../../services/store/store.service';


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

  constructor(private router: Router,
    private storeService: StoreService) {
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
    const response = this.storeService.getAllStores();
    response.subscribe((data) => {
      this.supermarkets = data.data;
    });
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
