import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  realizarPago(tipoPago: string) {
    if (tipoPago === 'apple-pay') {
    } else if (tipoPago === 'paypal') {
      window.location.href = 'https://www.paypal.com/invoice/p/#INV2-FBZT-C4ZL-BCHT-BLV7';
    } else if (tipoPago === 'tarjeta') {
      
    }
  }
}
