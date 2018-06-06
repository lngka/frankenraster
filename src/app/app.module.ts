import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { HelpPage } from '../pages/help/help';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SearcherrorPage } from '../pages/searcherror/searcherror';
import { SearchresultPage } from '../pages/searchresult/searchresult';

import { StatusBar } from '@ionic-native/status-bar';
import { ComponentsModule } from '../components/components.module';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FlashProvider } from '../providers/flash/flash';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HelpPage,
    HomePage,
    TabsPage,
    LoginPage,
    SearcherrorPage,
    SearchresultPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HelpPage,
    HomePage,
    TabsPage,
    LoginPage,
    SearcherrorPage,
    SearchresultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FlashProvider
  ]
})
export class AppModule {}
