// regcliente.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-regcliente',
  templateUrl: './regcliente.page.html',
  styleUrls: ['./regcliente.page.scss'],
})
export class RegclientePage implements OnInit {
  nombre_cli: string = '';
  apellido_cli: string = '';
  rut_cli: string = '';

  constructor(
    private router: Router,
    private dataservice: DataService,
  ) {}

  ngOnInit() {}

  registrarCliente() {
    // Almacena los datos del cliente en el servicio
    this.dataservice.setClienteData(this.rut_cli, this.nombre_cli, this.apellido_cli);
    // Redirige al formulario de vehículos
    this.router.navigate(['/regvehiculo']);
  }
}
