// data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private estacionamientoSource = new BehaviorSubject<any>(null);
  currentEstacionamiento = this.estacionamientoSource.asObservable();
  private clienteData: any = {};
  private duenoEstacionamientoData: any = {};
  private rutDueno: string = '';
  private monto: number = 0; // Nueva variable para almacenar el monto

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
    this.clienteData = {};
    this.duenoEstacionamientoData = {};
  }

  changeEstacionamiento(estacionamiento: any) {
    this.estacionamientoSource.next(estacionamiento);
  }

  setMonto(monto: number) {
    this.monto = monto;
  }

  getMonto(): number {
    return this.monto;
  }

  setRutDueno(rut: string) {
    this.rutDueno = rut;
  }

  getRutDueno(): string {
    return this.rutDueno;
  }
}
