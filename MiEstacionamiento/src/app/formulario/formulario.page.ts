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

  realizarPago(tipoPago: string) {
    if (tipoPago === 'apple-pay') {
      // Lógica para Apple Pay
    } else if (tipoPago === 'paypal') {
      window.location.href = 'https://www.paypal.com/invoice/p/#INV2-FBZT-C4ZL-BCHT-BLV7';
    } else if (tipoPago === 'tarjeta') {
      // Validaciones de tarjeta de crédito
      if (!this.validarTarjeta()) {
        this.mostrarAlerta('Error', 'Por favor, completa los detalles de la tarjeta correctamente.');
        return;
      }

      // Lógica de procesamiento de pago

      // Muestra un cuadro de diálogo con "Pago realizado con éxito"
      this.mostrarAlerta('Éxito', 'Pago realizado con éxito');
    }
  }

  private validarTarjeta(): boolean {
    const numTarjetaRegex = /^\d{16}$/;
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
    // Verifica si el evento es una tecla de borrar y borra todos los números de la fecha
    if (event.inputType === 'deleteContentBackward') {
      this.fechaExpiracion = '';
      return;
    }
  
    // Resto de la lógica para dar formato a la fecha
    this.fechaExpiracion = this.fechaExpiracion.replace(/[^\d]/g, '');
  
    if (this.fechaExpiracion.length > 4) {
      this.fechaExpiracion = this.fechaExpiracion.slice(0, 4);
    }
  
    if (this.fechaExpiracion.length >= 2) {
      this.fechaExpiracion = this.fechaExpiracion.substring(0, 2) + '/' + this.fechaExpiracion.substring(2);
    }
  }
  formatoNumeroTarjeta() {
    // Elimina caracteres no numéricos
    this.numeroTarjeta = this.numeroTarjeta.replace(/\D/g, '');
  
    // Limita a 16 dígitos
    if (this.numeroTarjeta.length > 16) {
      this.numeroTarjeta = this.numeroTarjeta.slice(0, 16);
    }
  
    // Separa cada 4 dígitos con un espacio
    //this.numeroTarjeta = this.numeroTarjeta.replace(/(\d{4})/g, '$1 ').trim();
  }
  

}
