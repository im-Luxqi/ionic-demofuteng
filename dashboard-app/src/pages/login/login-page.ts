import { Dashboard } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';


@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {

  backgrounds = [
    'assets/img/background/background-1.jpg',
    'assets/img/background/background-2.jpg',
    'assets/img/background/background-3.jpg'
  ];
  public loginForm: any;

  constructor(
    public navCtrl: NavController,
  ) {
  }

  doLogin() {
    this.navCtrl.push(Dashboard);
  }

}
