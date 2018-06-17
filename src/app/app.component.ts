import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
// import { SearchresultPage } from '../pages/searchresult/searchresult';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage: any = TabsPage;
  rootPage: any = LoginPage;
  // rootPage: any = SearchresultPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private http: HttpClient, private storage: Storage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // get actions and prices
    this.http.get("https://frdb-lngka.c9users.io/actions")
      .subscribe((data) => {this.storage.set("actions", JSON.stringify(data));
    });

    // get StatusIDs and status text
    this.http.get("https://frdb-lngka.c9users.io/status")
      .subscribe((data) => {this.storage.set("status", JSON.stringify(data));
    });
  }
}
