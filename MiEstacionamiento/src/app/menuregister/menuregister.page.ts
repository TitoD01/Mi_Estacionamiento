import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menuregister',
  templateUrl: './menuregister.page.html',
  styleUrls: ['./menuregister.page.scss'],
})
export class MenuregisterPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  irCliente() {
    this.navCtrl.navigateForward('/inicio');
  }

  irDueno() {
    this.navCtrl.navigateForward('/regcliente');
  }
}
