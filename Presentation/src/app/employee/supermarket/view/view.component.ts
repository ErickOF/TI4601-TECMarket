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
  public isDataReady = false;
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
    this.isDataReady = false;
    const response = this.storeService.getAllStores();
    response.subscribe((data) => {
      this.supermarkets = data.data;
      this.isDataReady = true;
    });
  }

  public delete(supermarket) {
    const response = this.storeService.deleteStore(supermarket.id_store);
    response.subscribe((data) => {
      if (data.jsonResponse) {
        this.showMsg('Success!', 'Store was added', 'success');
        this.createTable();
        this.router.navigateByUrl('/employee/view-supermarkets');
      } else {
        this.showMsg('Error!', 'Unknown error.', 'error');
      }
    }, (error) => {
      this.showMsg('Connection Error!', 'Try it later!', 'error');
    });
  }

  public edit(supermarket) {
    localStorage.setItem('edit-store', JSON.stringify(supermarket));
    this.router.navigateByUrl('/employee/edit-supermarket');
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
