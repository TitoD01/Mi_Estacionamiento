import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-regest',
  templateUrl: './regest.page.html',
  styleUrls: ['./regest.page.scss'],
})
export class RegestPage {
  direccion_est: string = '';
  tarifa_hora: number = 0;
  searchControl = new FormControl();
  comunas: any[] = [];
  comunaSeleccionada: any = null;
  user: any;

  constructor(private http: HttpClient, private dataservice: DataService, private navCtrl: NavController, private authService:AuthService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.searchComuna(value))
      )
      .subscribe((comunas) => {
        this.comunas = comunas;
      });
  }

  searchComuna(query: string) {
    return this.http.get<any[]>(`http://localhost:3000/comunas?query=${query}`);
  }

  seleccionarComuna(comuna: any) {
    // Almacena la comuna seleccionada
    this.comunaSeleccionada = comuna;

    // Establece el valor del searchControl con un guion para que no filtre nada
    this.searchControl.setValue('-');

    // Limpia la lista de comunas
    this.comunas = [];
  }

  registrarEstacionamiento() {
    // Obtener el rut_dueno almacenado en el servicio
    this.user = this.authService.getCurrentUser();
    // Verificar que el rut_dueno esté presente
  
    // Resto del código para registrar el estacionamiento
    this.http.post('http://localhost:3000/registrarEstacionamiento', {
      direccion_est: this.direccion_est,
      tarifa_hora: this.tarifa_hora,
      dueno_estacionamiento_rut_dueno: this.user.rut_dueno,
      comuna_id_comuna: this.comunaSeleccionada.id_comuna,
    }).subscribe(
      (estacionamientoResult) => {
        console.log('Estacionamiento registrado correctamente:', estacionamientoResult);
        // Restablecer los valores del formulario
        this.direccion_est = '';
        this.tarifa_hora = 0;
  
        // Limpiar datos del servicio
        this.dataservice.clearData();            
      },
      (estacionamientoError) => {
        console.error('Error al registrar estacionamiento:', estacionamientoError);
      }
    );
  }
}
