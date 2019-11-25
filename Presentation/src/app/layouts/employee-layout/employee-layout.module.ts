import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';

import { EmployeeLayoutRoutes } from './employee-layout.routing';

import { AddComponent } from './../../employee/supermarket/add/add.component';
import { EditComponent } from './../../employee/supermarket/edit/edit.component';
import { ViewComponent } from './../../employee/supermarket/view/view.component';
import { StoreWPurchasesComponent } from './../../employee/supermarket/stores-w-purchases/stores-w-purchases.component';
import { Top5StoresComponent } from './../../employee/supermarket/top-5-stores/top-5-stores.component';

import { SearchComponent } from './../../employee/clients/search/search.component';
import { SimilarClientsComponent } from './../../employee/clients/similar-clients/similar-clients.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    BarRatingModule
  ],
  declarations: [
    AddComponent,
    EditComponent,
    StoreWPurchasesComponent,
    ViewComponent,
    SearchComponent,
    SimilarClientsComponent,
    Top5StoresComponent
  ]
})
export class EmployeeLayoutModule { }
