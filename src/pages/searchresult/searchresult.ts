import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FlashProvider } from '../../providers/flash/flash';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SearchresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchresult',
  templateUrl: 'searchresult.html',
})
export class SearchresultPage {
  items = [];
  statuses = [];
  shoppingcart = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private flash: FlashProvider, private http: HttpClient, private storage: Storage) {
    // this.storage.get("status")
    //   .then((d) => {
    //     // the 1st element in statuses must be set to support the logic in .html
    //     this.statuses[0] = {
    //       StatusID: 0,
    //       Status: "NULL",
    //       VerbietetAktion: []
    //     };
    //     var data = JSON.parse(d);
    //     data.forEach((item) => {
    //       item.VerbietetAktion = this.verbietetAktionToArray(item.VerbietetAktion);
    //       this.statuses[parseInt(item.StatusID)] = item;
    //     });
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     return this.flash.show(e, 3000);
    //   });
  }

  // update searchResult everytime page loads
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

    this.storage.get("searchResult")
      .then((d) => {
        let items = JSON.parse(d);
        this.items = items;
      })
      .catch((e) => {
        console.error(e);
        return this.flash.show(e, 3000);
      });
  }

  // handle checkboxes
  // item mit AktionID markieren
  checkboxClicked(item, aktionID) {
    // remove item from shopping list if action == 0
    if (aktionID == 0) {
      item.AktionID = aktionID;
      this.shoppingcart = this.shoppingcart.filter((ordered_item) => {
        return ordered_item.AktionID != 0;
      });
    } else {
      item.AktionID = aktionID;
      this.shoppingcart.push(item);
    }
  }

  orderButtonClicked() {
    this.storage.get("loginData")
      .then((d) => {
        var data = JSON.parse(d);

        // build request object q
        var q = {};
        q["loginID"] = data["LoginID"];
        q["orderArray"] = [];
        this.shoppingcart.forEach(cart_item => {
          q["orderArray"].push(
            {
              OrdnerID: cart_item.OrdnerID,
              AktionID: cart_item.AktionID
            }
          );
        });
        
        var myURL = "https://frdb-lngka.c9users.io/order"
        this.http.post(myURL, q)
          .subscribe(
            (res) => {
              this.flash.show(JSON.stringify(res), 3000);
            },
            (e) => {
              console.error(e);
              return this.flash.show(JSON.stringify(e), 3000);
            }
          )
      })
      .catch((e) => {
        console.error(e);
        return this.flash.show(e, 3000);
      });
  }

  verbietetAktionToArray(string) {
    return string.split("|").filter(Number);
  }
}
