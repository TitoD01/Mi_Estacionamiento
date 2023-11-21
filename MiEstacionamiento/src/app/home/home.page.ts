import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  router: any;

  constructor(private navCtrl: NavController) {}

  irMenuRegister() {
    this.navCtrl.navigateForward('/menuregister');
  }
  irLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
