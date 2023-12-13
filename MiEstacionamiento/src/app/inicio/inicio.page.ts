import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  comuna: string = '';
  searchResults: any[] = [];
  welcomeMessage: string = '';
  comunaNotFoundError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    console.log('Información del usuario en inicio:', user);

    // Almacena la información del usuario en el servicio AuthService
    this.authService.setUser(user, this.authService.getTipoUsuarioLocalStorage());

    if (user && user.nombre_cli && user.apellido_cli) {
      this.welcomeMessage = `${user.nombre_cli} ${user.apellido_cli}`;
    } else if (user && user.nombre_dueno && user.apellido_dueno) {
      this.welcomeMessage = `${user.nombre_dueno} ${user.apellido_dueno}`;
    }
  }

  async presentComunaNotFoundErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'La comuna que estás buscando no fue encontrada. Por favor, verifica el nombre e intenta nuevamente.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  search() {
    this.authService.searchByComuna(this.comuna).subscribe(
      (results) => {
        this.searchResults = results;

        // Verificar si no se encontraron resultados
        this.comunaNotFoundError = this.searchResults.length === 0;

        // Mostrar la alerta si no se encuentra la comuna
        if (this.comunaNotFoundError) {
          this.presentComunaNotFoundErrorAlert();
        }
      },
      (error) => {
        console.error('Error en la búsqueda:', error);
      }
    );
  }

  navigateToArriendo(estacionamiento: any) {
    // Usa el servicio para compartir datos
    this.dataService.changeEstacionamiento(estacionamiento);
    this.router.navigate(['/arriendo']);
  }

  logout() {
    // Implementa la lógica para cerrar la sesión aquí
    this.authService.setUser(null, null); // Establecer ambos valores como null
    this.router.navigate(['/home']);
  }
}
