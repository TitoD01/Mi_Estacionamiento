import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private router: Router, private alertController: AlertController) {}

  private validarTarjeta(): boolean {
    const numTarjetaRegex = /^\d{20}$/; // Cambiado a 16 dígitos
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

  formatoFechaExpiracion(event: any) {
    if (event.inputType === 'deleteContentBackward') {
      this.fechaExpiracion = '';
      return;
    }

    this.fechaExpiracion = this.fechaExpiracion.replace(/[^\d]/g, '');

    if (this.fechaExpiracion.length > 4) {
      this.fechaExpiracion = this.fechaExpiracion.slice(0, 4);
    }

    if (this.fechaExpiracion.length >= 2) {
      this.fechaExpiracion = this.fechaExpiracion.substring(0, 2) + '/' + this.fechaExpiracion.substring(2);
    }
  }

  formatoNumeroTarjeta() {
    // Eliminar espacios y caracteres no numéricos
    this.numeroTarjeta = this.numeroTarjeta.replace(/[^\d]/g, '');
  
    // Agregar espacios cada 4 caracteres
    this.numeroTarjeta = this.numeroTarjeta.replace(/(\d{4})(?=\d)/g, '$1 ');
  
    // Limitar a un máximo de 20 caracteres
    if (this.numeroTarjeta.length > 20) {
      this.numeroTarjeta = this.numeroTarjeta.slice(0, 20);
    }
  }
  
}
