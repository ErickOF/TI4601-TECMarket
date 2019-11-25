import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientLayoutRoutes } from './client-layout.routing';
import { BuyComponent } from './../../clients/buy/buy.component';
import { PurchaseHistoryComponent } from './../../clients/purchase-history/purchase-history.component';
import { ViewComponent } from './../../clients/supermarkets/view/view.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserProfileComponent,
    BuyComponent,
    PurchaseHistoryComponent,
    ViewComponent
  ]
})
export class ClientLayoutModule { }
