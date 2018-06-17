import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FlashProvider } from '../../providers/flash/flash';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { SearchresultPage } from '../searchresult/searchresult';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  keyword: String;
  formDisabled: Boolean;
  loginID: Number;

  constructor(public navCtrl: NavController, private flash: FlashProvider, private http: HttpClient, private storage: Storage) {
    this.flash.show('Automatischer Logout nach 20 Minuten Inaktivität', 1500);
    this.formDisabled = false;

    this.storage.get("loginData")
      .then((d) => {
        let data = JSON.parse(d);
        this.loginID = data["LoginID"];
      })
      .catch(err => {throw err});
  }

  search() {
    if(this.loginID === undefined) {
      return this.flash.show("search() Missing LoginID", 3000);
    }

    var searchData = {
      keyword: this.keyword,
      loginID: this.loginID
    }
    this.http.post("https://frdb-lngka.c9users.io/search", searchData)
      .subscribe(
        (res: any) => {
          if (!res.length) {
            return this.flash.show("Kein Ergebnis mit diesem Begriff", 1500);
          }
          this.storage.set("searchResult", JSON.stringify(res))
            .then(() => {
              this.navCtrl.push(SearchresultPage);
            })
            .catch((e) => {
              console.error(e);
              this.flash.show(e, 3000);
            });

        },
        // search failed, show error
        (err: any) => {
          console.error(err);
          this.flash.show(err.error, 3000);
    })
  }
}
