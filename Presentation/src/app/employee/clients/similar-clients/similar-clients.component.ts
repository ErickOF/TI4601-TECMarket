import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

import { StoreService } from './../../../services/store/store.service';


declare var $: any;

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-similar-clients',
  templateUrl: './similar-clients.component.html',
  styleUrls: ['./similar-clients.component.scss']
})
export class SimilarClientsComponent implements OnInit, AfterViewInit {
  public sales;
  public clients;
  public table: DataTable;
  public ready = false;

  constructor(private storeService: StoreService) {
    const response = this.storeService.getAllUsers();
    response.subscribe((data) => {
      console.log(data)
      this.clients = data;
    }, (error) => {
      this.showMsg('Connection Error!', 'Try it later!', 'error');
    });
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
    const response = this.storeService.getSimilarClients(user);
    response.subscribe((data) => {
      this.sales = data;
      this.ready = true;
    }, (error) => {
      this.showMsg('Connection Error!', 'Try it later!', 'error');
    });
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }
}
