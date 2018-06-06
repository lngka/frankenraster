import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FlashProvider } from '../../providers/flash/flash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private flash: FlashProvider) {
    // function declared in src/components/flash/flash.ts
    this.flash.show('Automatischer Logout nach 20 Minuten Inaktivität', 1500);
  }
}
