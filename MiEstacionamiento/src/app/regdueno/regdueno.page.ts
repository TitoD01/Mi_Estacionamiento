import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-regdueno',
  templateUrl: './regdueno.page.html',
  styleUrls: ['./regdueno.page.scss'],
})
export class RegduenoPage {
  nombre_dueno: string = '';
  apellido_dueno: string = '';
  rut_dueno: string = '';
  errorCredenciales: boolean = false;

  constructor(private router: Router, private dataservice: DataService, private alertController: AlertController) {}

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error en las credenciales. Por favor, revisa los datos ingresados e inténtalo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  registrarDuenoEstacionamiento() {
    if (this.validarNombre() && this.validarApellido() && this.validarRut()) {
      const duenoData = {
        nombre_dueno: this.nombre_dueno,
        apellido_dueno: this.apellido_dueno,
        rut_dueno: this.rut_dueno,
      };

      this.dataservice.setDuenoEstacionamientoData(duenoData);
      this.router.navigate(['/regestacionamiento']);
    } else {
      this.errorCredenciales = true;
      this.presentErrorAlert();
    }
  }

  validarNombre(): boolean {
    return this.nombre_dueno.length >= 3;
  }

  validarApellido(): boolean {
    return this.apellido_dueno.length >= 3;
  }

  validarRut(): boolean {
    // Asumiendo que el RUT no puede ser más largo de 9 caracteres
    return this.rut_dueno.length <= 9;
  }
}
