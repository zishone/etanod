import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from '../config/app-routes.const';

import { SharedModule } from './shared/shared.module';
import { AdminUserModule } from './admin-user/admin-user.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminUserComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminUserModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
