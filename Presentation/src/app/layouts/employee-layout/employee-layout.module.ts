import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';

import { EmployeeLayoutRoutes } from './employee-layout.routing';

import { AddComponent } from './../../employee/supermarket/add/add.component';
import { EditComponent } from './../../employee/supermarket/edit/edit.component';
import { ViewComponent } from './../../employee/supermarket/view/view.component';


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
    ViewComponent
  ]
})
export class EmployeeLayoutModule { }
