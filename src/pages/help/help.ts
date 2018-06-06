import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FlashProvider } from '../../providers/flash/flash';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

  constructor(public navCtrl: NavController,
              private storage: Storage,
              private flash: FlashProvider) {

  }

  logMeOut() {
    this.navCtrl.insert(0, LoginPage).then(() => {
      this.navCtrl.popToRoot();
      this.flash.show("Ciao!", 1000);
    });
  }

}
