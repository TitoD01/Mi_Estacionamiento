// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rutCliente: string = '';
  private nombreCliente: string = '';
  private apellidoCliente: string = '';

  setClienteData(rut: string, nombre: string, apellido: string) {
    this.rutCliente = rut;
    this.nombreCliente = nombre;
    this.apellidoCliente = apellido;
  }

  getRutCliente(): string {
    return this.rutCliente;
  }

  // Puedes agregar métodos similares para obtener otros datos del cliente si es necesario
}
