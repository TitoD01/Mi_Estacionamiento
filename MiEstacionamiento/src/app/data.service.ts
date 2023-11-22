// data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private clienteData: any = {};
  private duenoEstacionamientoData: any = {};

  constructor() {}

  setClienteData(data: any) {
    this.clienteData = data;
  }

  getClienteData() {
    return this.clienteData;
  }

  setDuenoEstacionamientoData(data: any) {
    this.duenoEstacionamientoData = data;
  }

  getDuenoEstacionamientoData() {
    return this.duenoEstacionamientoData;
  }

  clearData() {
    // Añadir este método para limpiar los datos cuando sea necesario
    this.clienteData = {};
    this.duenoEstacionamientoData = {};
  }
}
