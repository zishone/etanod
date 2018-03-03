import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { ReportsPage } from '../pages/reports/reports';
import { ReportDetailPage } from '../pages/reportDetail/reportDetail';
import { ReportCrimePage } from '../pages/reportCrime/reportCrime';
import { ProfilePage } from '../pages/profile/profile';
import { CheckPage } from '../pages/check/check';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Facebook } from '@ionic-native/facebook';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBaBNvS_Bd5R1_3cPMgbjGpmhTTjpwL31Q",
  authDomain: "etanod-12ebe.firebaseapp.com",
  databaseURL: "https://etanod-12ebe.firebaseio.com",
  projectId: "etanod-12ebe",
  storageBucket: "etanod-12ebe.appspot.com",
  messagingSenderId: "523367764822"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ReportsPage,
    ReportDetailPage,
    ReportCrimePage,
    ProfilePage,
    CheckPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ReportsPage,
    ReportDetailPage,
    ReportCrimePage,
    ProfilePage,
    CheckPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    AngularFireAuth,
    AngularFireDatabase
  ]
})
export class AppModule {}
