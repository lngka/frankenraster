import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FlashProvider } from '../../providers/flash/flash';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  orders = [];
  statuses = [];
  actions = [];
  loginID : Number;
  constructor(public navCtrl: NavController, private flash: FlashProvider, private http: HttpClient, private storage: Storage) {

  }
  // update statuses everytime before page loads
  ionViewWillEnter() {
    this.storage.get("status")
      .then((d) => {
        // the 1st element in statuses must be set to support the logic in .html
        this.statuses[0] = {
          StatusID: 0,
          Status: "NULL",
          VerbietetAktion: []
        };
        var data = JSON.parse(d);
        data.forEach((item) => {
          item.VerbietetAktion = this.verbietetAktionToArray(item.VerbietetAktion);
          this.statuses[parseInt(item.StatusID)] = item;
        });
      })
      .catch((e) => {
        console.error(e);
        return this.flash.show(e, 3000);
      });
    this.storage.get("actions")
        .then((d) => {
          // the 1st element in actions must be set to support the logic in .html
          var dummyAction  = {
            AktionID: 0,
            Preis: 0,
            Aktion: "NULL Aktion"
          };
          var data = JSON.parse(d);
          this.actions = data;
          this.actions.unshift(dummyAction);
        })
        .catch((e) => {
          console.error(e);
          return this.flash.show(e, 3000);
        });
  }

  // update orders everytime before page loads
  ionViewDidEnter() {
    this.storage.get("loginData")
      .then(d => {
        var data = JSON.parse(d);
        this.loginID = data["LoginID"];

        let myURL = "https://frdb-lngka.c9users.io/getorders?loginID="+this.loginID;
        this.http.get(myURL)
          .subscribe(
            (data) => {
              this.orders = JSON.parse(JSON.stringify(data));
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

  verbietetAktionToArray(string) {
    return string.split("|").filter(Number);
  }
}
