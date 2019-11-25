import { Routes } from '@angular/router';

import { AddComponent } from './../../employee/supermarket/add/add.component';
import { EditComponent } from './../../employee/supermarket/edit/edit.component';
import { StoreWPurchasesComponent } from './../../employee/supermarket/stores-w-purchases/stores-w-purchases.component';
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
        path: 'stores-w-sales',
        component: StoreWPurchasesComponent
    },
    {
        path: 'add-supermarket',
        component: AddComponent
    },
    {
        path: 'edit-supermarket',
        component: EditComponent
    }
];
