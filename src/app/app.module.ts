import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { EditPage } from '../pages/edit/edit';
import { MorePage } from '../pages/more/more';
import { SlidesPage } from '../pages/slides/slides';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    AddPage,
    EditPage,
    MorePage,
    SlidesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    AddPage,
    EditPage,
    MorePage,
    SlidesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    LocalNotifications
  ]
})
export class AppModule {}
