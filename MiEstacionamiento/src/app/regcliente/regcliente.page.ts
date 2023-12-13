import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-regcliente',
  templateUrl: './regcliente.page.html',
  styleUrls: ['./regcliente.page.scss'],
})
export class RegclientePage implements OnInit {
  nombre_cli: string = '';
  apellido_cli: string = '';
  rut_cli: string = '';
  errorCredenciales: boolean = false;

  constructor(private router: Router, private dataservice: DataService, private alertController: AlertController) {}

  ngOnInit() {}

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error en las credenciales. Por favor, revisa los datos ingresados e inténtalo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  registrarCliente() {
    if (this.validarNombre() && this.validarApellido() && this.validarRut()) {
      const clienteData = {
        nombre_cli: this.nombre_cli,
        apellido_cli: this.apellido_cli,
        rut_cli: this.rut_cli,
      };

      // Almacena datos del cliente en el servicio
      this.dataservice.setClienteData(clienteData);

      // Redirigir al formulario de vehículos
      this.router.navigate(['/regvehiculo']);
    } else {
      // Muestra la tarjeta de error y la alerta
      this.errorCredenciales = true;
      this.presentErrorAlert();
    }
  }

  validarNombre(): boolean {
    return this.nombre_cli.length >= 3;
  }

  validarApellido(): boolean {
    return this.apellido_cli.length >= 3;
  }

  validarRut(): boolean {
    // Asumiendo que el RUT no puede ser más largo de 9 caracteres
    return this.rut_cli.length <= 10;
  }
}
