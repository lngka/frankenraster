import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { FlashProvider } from '../../providers/flash/flash';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  company: string;
  login: string;
  password: string;
  formDisabled: boolean = false; // enable/disable login button

  constructor(public navCtrl: NavController, private storage: Storage,
              private http: HttpClient, private flash: FlashProvider) {
    storage.get("loginData")
      .then((data) => {
        if (data) {
          data = JSON.parse(data);
          this.company = data.company;
          this.login   = data.login;
        }
      })
      .catch(err => {throw err});
  }

  logMeIn() {
    // prevent more login request
    this.formDisabled = true;

    var loginData = {
      company: this.company,
      login: this.login,
      password: this.password
    }
    this.http.post("https://frdb-lngka.c9users.io/login", loginData)
      .subscribe(
        (res: any) => {
          if (res["LoginID"] !== undefined) {
            // login succeed save loginData, later use
            delete loginData.password;
            loginData["LoginID"] = res["LoginID"];
            this.storage.set("loginData", JSON.stringify(loginData));

            this.navCtrl.push(TabsPage);
          } else {
            // login failed, server not returning LoginID
            this.formDisabled = false;
            this.flash.show("Invalid Response from Server", 3000);
          }
        },
        // login failed, unknown error
        (err: any) => {
          this.formDisabled = false;
          console.error(err);
          this.flash.show(err.error, 3000);
    })
  }
}
