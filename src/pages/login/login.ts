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

    storage.get("loginData").then((data) => {
      if (data) {
        data = JSON.parse(data);
        this.company = data.company;
        this.login   = data.login;
      }
    });
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
        // login succeed
        (res) => {

          // save loginData but not the password to use later
          delete loginData.password;
          this.storage.set("loginData", JSON.stringify(loginData));

          console.log(res);
          this.navCtrl.push(TabsPage);
        },
        // login failed
        (err: HttpErrorResponse) => {
          this.formDisabled = false;
          console.log(err);
          this.flash.show(err.error, 3000);
    })
  }
}
