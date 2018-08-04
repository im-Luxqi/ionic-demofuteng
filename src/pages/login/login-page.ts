import { Dashboard } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Router, ActivatedRoute } from '@angular/router';


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
    private router: Router,
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
  ) {
  }

  doLogin() {
      
    // this.router.navigate(['dashboard'],{relativeTo:this.route});
    this.navCtrl.push(Dashboard);
    // this.navCtrl.creat
    // let modal = this.modalCtrl.create(Dashboard);
    //     modal.present();
  }

}
