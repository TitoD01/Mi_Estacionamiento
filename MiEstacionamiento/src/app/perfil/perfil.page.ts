// perfil.ts

import { Component, OnInit } from '@angular/core';
import { User, AuthService, Tarjeta } from '../auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any;
  tarjetas: Tarjeta[] = [];

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  ngOnInit() {
    // Obtén la información del usuario y su tipo
    this.user = this.authService.getCurrentUser();
    const tipoUsuario = this.authService.getTipoUsuarioLocalStorage();

    // Llama a getTarjetasUsuarioActual solo después de que el usuario esté inicializado
    this.authService.getTarjetasUsuarioActual().subscribe(
      (tarjetas) => {
        console.log('Tarjetas en el componente de perfil:', tarjetas);
        this.tarjetas = tarjetas;
      },
      (error) => {
        console.error('Error al cargar tarjetas:', error);
      }
    );
  }

  irProductos() {
    this.navCtrl.navigateForward('/productos');
  }

  irNuevatarjeta() {
    this.navCtrl.navigateForward('/formulario');
  }
}
