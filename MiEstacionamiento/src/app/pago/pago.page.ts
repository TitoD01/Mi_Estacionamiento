// pago.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, Tarjeta } from '../auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  tarjetas: Tarjeta[] = [];
  monto: number = 0;
  selectedTarjeta: Tarjeta | null = null;
  horarioInicio: Date = new Date();
  horarioTermino: Date = new Date();
  estacionamiento: any;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getTarjetas().subscribe(
      (tarjetas) => {
        this.tarjetas = tarjetas;
        this.dataService.currentEstacionamiento.subscribe(estacionamiento => {
          this.estacionamiento = estacionamiento;

          this.route.queryParamMap.subscribe(params => {
            this.horarioInicio = params.has('horarioInicio') ? new Date(params.get('horarioInicio')!) : new Date();
            this.horarioTermino = params.has('horarioTermino') ? new Date(params.get('horarioTermino')!) : new Date();
            this.calcularMonto();
          });
        });
      },
      (error) => {
        console.error('Error al cargar tarjetas:', error);
      }
    );
  }

  calcularMonto(): void {
    if (!this.horarioInicio || !this.horarioTermino || !this.estacionamiento || !this.estacionamiento.tarifa_hora) {
      this.monto = 0;
      return;
    }

    const tarifaPorHora = this.estacionamiento.tarifa_hora;
    const diferenciaTiempo = this.horarioTermino.getTime() - this.horarioInicio.getTime();
    const diferenciaHoras = diferenciaTiempo / (1000 * 60 * 60);

    this.monto = diferenciaHoras * tarifaPorHora;
  }

  seleccionarTarjeta(tarjeta: Tarjeta): void {
    this.selectedTarjeta = tarjeta;
  }

  realizarPago() {
    if (!this.selectedTarjeta || !this.estacionamiento) {
      console.error('Seleccione una tarjeta antes de realizar el pago.');
      return;
    }
  
    this.dataService.setMonto(this.monto);
  
    // Obtener el monto formateado como una cadena
    const detalle_pago = this.formatCurrency(this.monto);
  
    this.authService.realizarPago(detalle_pago)
      .subscribe(
        (response) => {
          console.log('Pago realizado exitosamente:', response);
          this.router.navigate(['/inicio']);
          // Puedes realizar alguna acción adicional después del pago, como navegar a otra página
        },
        (error) => {
          console.error('Error al realizar el pago:', error);
          // Puedes manejar el error según tus necesidades
        }
      );
  }
  
  // Método para formatear el monto como una cadena según la lógica de tu aplicación
  formatCurrency(value: number): string {
    // Eliminar los puntos de separación de miles, obtener solo la parte entera y quitar el signo de peso
    const formattedValue = Math.floor(value).toString();
    return formattedValue;
  }

  formatDateForUrl(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  irNewtarjeta(){
    this.router.navigate(['/formulario']);
  }
}