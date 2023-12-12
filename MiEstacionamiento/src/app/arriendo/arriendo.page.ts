// arriendo.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-arriendo',
  templateUrl: './arriendo.page.html',
  styleUrls: ['./arriendo.page.scss'],
})
export class ArriendoPage implements OnInit {
  estacionamiento: any;
  horarioInicio: string = '';
  horarioTermino: string = '';
  vehiculos: any[] = [];
  selectedVehiculo: any;

  constructor(private router: Router, private authService: AuthService, private dataService: DataService) {}

  ngOnInit() {
    const user = this.authService.getUser();

    this.dataService.currentEstacionamiento.subscribe(estacionamiento => {
      this.estacionamiento = estacionamiento;
    });

    this.loadVehiculos();
  }

  loadVehiculos() {
    this.authService.getVehiculos().subscribe(
      (vehiculos) => {
        this.vehiculos = vehiculos;
      },
      (error) => {
        console.error('Error al cargar vehículos:', error);
      }
    );
  }

  formatDateForUrl(date: Date): string {
    // Ajusta el formato según tus necesidades
    return date.toISOString();
  }
  
  // Método para realizar la inserción en la base de datos
  insertarArriendo() {
    const vehiculoPatente = this.selectedVehiculo.patente;
    const estacionamientoId = this.estacionamiento.id_estacionamiento;

    // Realizar la llamada al servicio para insertar en la base de datos
    this.authService.insertarArriendo(this.horarioInicio, this.horarioTermino, vehiculoPatente, estacionamientoId)
      .subscribe(
        (response) => {
          console.log('Inserción exitosa:', response);
          // Puedes realizar alguna acción adicional después de la inserción, como navegar a otra página
          this.router.navigate(['/pago'], {
            queryParams: {
              horarioInicio: this.horarioInicio,
              horarioTermino: this.horarioTermino,
            },
          });
        },
        (error) => {
          console.error('Error al insertar arriendo:', error);
          // Puedes manejar el error según tus necesidades
        }
      );
  }
}