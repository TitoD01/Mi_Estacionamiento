import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { NavController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private navCtrl: NavController,  private menuController: MenuController) {}
  @Output() closeMenu = new EventEmitter<void>();

  logout() {
    this.menuController.close(); // Cierra el menú antes de navegar
    this.authService.logout();
  }

  irPerfil() {
    this.menuController.close(); // Cierra el menú antes de navegar
    this.navCtrl.navigateForward('/perfil');
  }
}
