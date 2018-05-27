import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FlashProvider } from '../../providers/flash/flash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private flashProvider: FlashProvider) {
    // function declared in src/components/flash/flash.ts
    this.flashProvider.show('Automatischer Logout nach 20 Minuten Inaktivität', 1500);
  }
}
