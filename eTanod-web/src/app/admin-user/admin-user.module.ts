import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ADMIN_ROUTES } from './admin-routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { UserComponent } from './user/user.component';

@NgModule({
	declarations:[
	DashboardComponent,
	NavbarComponent,
	ReportViewComponent,
	UserComponent],
	imports: [
		CommonModule,
		RouterModule.forRoot(ADMIN_ROUTES)
	],
	providers: [
	],
	exports: [
		NavbarComponent,
		ReportViewComponent
	]
})

export class AdminUserModule {}