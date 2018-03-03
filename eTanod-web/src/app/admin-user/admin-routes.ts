import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminUserComponent } from './admin-user.component';
import { UserComponent } from './user/user.component';
export const ADMIN_ROUTES: Routes = [
  {
  	path:"admin",
  	component: AdminUserComponent,
  	children: [
  		{
  			path:'',
  			component:DashboardComponent
  		},
  		{
  			path:'user/:userid',
  			component:UserComponent
  		}
  	]
  }
];