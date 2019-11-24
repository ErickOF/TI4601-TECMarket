import { Routes } from '@angular/router';

import { AddComponent } from './../../employee/supermarket/add/add.component';
import { ViewComponent } from './../../employee/supermarket/view/view.component';


export const EmployeeLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'view-supermarkets',
        pathMatch: 'full',
    },
    {
        path: 'view-supermarkets',
        component: ViewComponent
    },
    {
        path: 'add-supermarket',
        component: AddComponent
    }
];
