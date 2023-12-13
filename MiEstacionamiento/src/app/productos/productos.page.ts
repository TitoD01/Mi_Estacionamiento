import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  vehiculos: any[] = [];
  estacionamientos: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.obtenerVehiculos();
    this.obtenerEstacionamientos();
  }

  obtenerVehiculos() {
    this.authService.getVehiculosUsuarioActual().subscribe(
      (data: any[]) => {
        this.vehiculos = data;
      },
      error => {
        console.error('Error al obtener vehículos:', error);
      }
    );
  }

  obtenerEstacionamientos() {
    this.authService.getEstacionamientosUsuarioActual().subscribe(
      (data: any[]) => {
        this.estacionamientos = data;
      },
      error => {
        console.error('Error al obtener estacionamientos:', error);
      }
    );
  }

  irNewest(){
    this.router.navigate(['/regest']);
  }

  irNewvehiculo(){
    this.router.navigate(['/regvehi']);
  }
}

