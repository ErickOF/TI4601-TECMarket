import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ViewComponent } from './../../clients/supermarkets/view/view.component';


export const ClientLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'user-profile',
        pathMatch: 'full',
    },
    {
        path: 'user-profile',
        component: UserProfileComponent
    },
    {
        path: 'view-supermarkets',
        component: ViewComponent
    },
];
