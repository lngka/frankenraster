import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { FlashProvider } from '../../providers/flash/flash';
import { Storage } from '@ionic/storage';

// import { LoginPage } from '../login/login';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {
  loginID: Number;
  Name: string;
  Vorname: string;
  Abteilung: string;
  Telefon: string;


  constructor(public navCtrl: NavController,
              private storage: Storage,
              private flash: FlashProvider,
              private http: HttpClient) {

  }

  ionViewDidEnter() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.storage.get("loginData")
      .then(d => {
        var data = JSON.parse(d);
        this.loginID = data["LoginID"];

        let myURL = "https://frdb-lngka.c9users.io/logininfo?id="+this.loginID;
        this.http.get(myURL)
          .subscribe(
            (data: any) => {
              this.Name = data[0]["Name"];
              this.Vorname = data[0]["Vorname"];
              this.Abteilung = data[0]["Abteilung"];
              this.Telefon = data[0]["Telefon"];
            },
            error => {
              console.error(error);
              return this.flash.show(error, 3000);
            }
          )
      })
      .catch(e => {
        console.error(e);
        return this.flash.show(e, 3000);
      })
  }
}
