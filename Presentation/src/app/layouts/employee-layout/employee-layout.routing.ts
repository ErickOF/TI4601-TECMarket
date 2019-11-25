import { Routes } from '@angular/router';

import { AddComponent } from './../../employee/supermarket/add/add.component';
import { EditComponent } from './../../employee/supermarket/edit/edit.component';
import { StoreWPurchasesComponent } from './../../employee/supermarket/stores-w-purchases/stores-w-purchases.component';
import { ViewComponent } from './../../employee/supermarket/view/view.component';
import { Top5StoresComponent } from './../../employee/supermarket/top-5-stores/top-5-stores.component';

import { SearchComponent } from './../../employee/clients/search/search.component';
import { SimilarClientsComponent } from './../../employee/clients/similar-clients/similar-clients.component';


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
        path: 'top5-stores',
        component: Top5StoresComponent
    },
    {
        path: 'add-supermarket',
        component: AddComponent
    },
    {
        path: 'edit-supermarket',
        component: EditComponent
    },
    {
        path: 'search-client',
        component: SearchComponent
    },
    {
        path: 'similar-clients',
        component: SimilarClientsComponent
    }
];
