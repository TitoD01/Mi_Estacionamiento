// regvehiculo.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-regvehiculo',
  templateUrl: './regvehiculo.page.html',
  styleUrls: ['./regvehiculo.page.scss'],
})

export class RegvehiculoPage implements OnInit {
  marcas: any[] = [];
  patente: string = '';
  marcaId: number = 0;
  modelo: string = '';
  anno: number = 0;

  constructor(private http: HttpClient, private dataservice: DataService) {}

  ngOnInit() {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.http.get<any[]>('http://localhost:3000/marcas').subscribe(
      (data) => {
        this.marcas = data;
      },
      (error) => {
        console.error('Error al cargar las marcas:', error);
      }
    );
  }
  

  registrarVehiculo() {
    console.log('Marca seleccionada:', this.marcaId);
  
    // Obtener los datos del cliente almacenados en el servicio
    const rutCliente = this.dataservice.getRutCliente();
  
    // Verificar que el rut del cliente esté presente
    if (!rutCliente) {
      console.error('Error: Falta el rut del cliente.');
      return;
    }
  
    // Verificar que todos los campos necesarios estén proporcionados
    if (!this.patente || !this.marcaId || !this.modelo || !this.anno) {
      console.error('Error: Todos los campos deben estar completos.');
      return;
    }
  
    // Realizar el registro del vehículo junto con el rut del cliente
    this.http
      .post('http://localhost:3000/registrarVehiculo', {
        patente: this.patente,
        marcaId: this.marcaId,
        modelo: this.modelo,
        anno: this.anno,
        rutCliente: rutCliente,
      })
      .subscribe(
        (data) => {
          console.log('Vehículo registrado correctamente:', data);
          // Restablecer los valores del formulario
          this.patente = '';
          this.marcaId = 0;
          this.modelo = '';
          this.anno = 0;
        },
        (error) => {
          console.error('Error al registrar vehículo:', error);
        }
      );
  }
}