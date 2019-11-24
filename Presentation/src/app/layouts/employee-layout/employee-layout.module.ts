import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeLayoutRoutes } from './employee-layout.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  ]
})
export class EmployeeLayoutModule { }
