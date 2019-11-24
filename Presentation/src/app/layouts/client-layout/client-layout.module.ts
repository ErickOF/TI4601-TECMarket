import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientLayoutRoutes } from './client-layout.routing';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserProfileComponent
  ]
})
export class ClientLayoutModule { }