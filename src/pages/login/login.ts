import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrl: 'login.scss'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }
  login() {
    alert("Not working yet..")
  }
}
