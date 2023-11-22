// regdueno.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-regdueno',
  templateUrl: './regdueno.page.html',
  styleUrls: ['./regdueno.page.scss'],
})
export class RegduenoPage {
  nombre_dueno: string = '';
  apellido_dueno: string = '';
  rut_dueno: string = '';

  constructor(private router: Router, private dataservice: DataService) {}

  registrarDuenoEstacionamiento() {
    const duenoData = {
      nombre_dueno: this.nombre_dueno,
      apellido_dueno: this.apellido_dueno,
      rut_dueno: this.rut_dueno,
    };

    // Almacena datos del dueño del estacionamiento en el servicio
    this.dataservice.setDuenoEstacionamientoData(duenoData);

    // Redirigir al formulario de estacionamiento
    this.router.navigate(['/regestacionamiento']);
  }
}