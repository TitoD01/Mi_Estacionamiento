import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-formulario',
  templateUrl: 'formulario.page.html',
  styleUrls: ['formulario.page.scss'],
})

export class FormularioPage {
  nombrePropietario: string = '';
  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';
  bancos: any[] = [];
  selectedBanco: any;
  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) {    
    this.obtenerBancos();
  }

  private validarTarjeta(): boolean {
    const numTarjetaRegex = /^\d{16}$/; // Cambiado a 16 dígitos
    const fechaExpiracionRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;
    const nombreRegex = /^[a-zA-Z]{2,20}\s[a-zA-Z]{2,20}$/;
    return (
      numTarjetaRegex.test(this.numeroTarjeta) &&
      fechaExpiracionRegex.test(this.fechaExpiracion) &&
      cvvRegex.test(this.cvv) &&
      nombreRegex.test(this.nombrePropietario)
    );
  }

  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }



  formatoNumeroTarjeta() {
    // Eliminar espacios y caracteres no numéricos
    this.numeroTarjeta = this.numeroTarjeta.replace(/[^\d]/g, '');
  
  
    // Limitar a un máximo de 20 caracteres
    if (this.numeroTarjeta.length > 20) {
      this.numeroTarjeta = this.numeroTarjeta.slice(0, 20);
    }
  }

  obtenerBancos() {
    this.authService.getBancos().subscribe(
      (data: any[]) => {
        this.bancos = data;
      },
      error => {
        console.error('Error al obtener bancos:', error);
      }
    );
  }

  agregarTarjeta() {
      const { numeroTarjeta, cvv, fechaExpiracion } = this;
      const clienteRut = this.authService.getCurrentUser().rut_cli;
      const bancoId = this.selectedBanco;
  
      this.authService.insertarTarjeta(numeroTarjeta, cvv, fechaExpiracion, clienteRut, bancoId).subscribe(
        (response) => {
          console.log('Tarjeta agregada correctamente:', response);
          // Puedes mostrar una alerta o redirigir a otra página después de agregar la tarjeta
          this.mostrarAlerta('Éxito', 'Tarjeta agregada correctamente');
          this.router.navigate(['/inicio']);
        },
        (error) => {
          console.error('Error al agregar tarjeta:', error);
          this.mostrarAlerta('Error', 'Hubo un error al agregar la tarjeta. Por favor, intenta nuevamente.');
        }
      );
  }
  
}
