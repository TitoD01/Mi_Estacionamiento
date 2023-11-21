import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private clienteData: any = {}; // Almacena datos del cliente

  constructor() {}

  setClienteData(data: any) {
    this.clienteData = data;
  }

  getClienteData() {
    return this.clienteData;
  }
}