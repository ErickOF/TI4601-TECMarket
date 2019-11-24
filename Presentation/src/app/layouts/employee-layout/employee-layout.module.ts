import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeLayoutRoutes } from './employee-layout.routing';

import { AddComponent } from './../../employee/supermarket/add/add.component';
import { ViewComponent } from './../../employee/supermarket/view/view.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddComponent,
    ViewComponent
  ]
})
export class EmployeeLayoutModule { }
