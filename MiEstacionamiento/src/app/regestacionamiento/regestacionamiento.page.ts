import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-regestacionamiento',
  templateUrl: './regestacionamiento.page.html',
  styleUrls: ['./regestacionamiento.page.scss'],
})
export class RegestacionamientoPage {
  direccion_est: string = '';
  tarifa_hora: number = 0;
  searchControl = new FormControl();
  comunas: any[] = [];
  comunaSeleccionada: any = null;


  constructor(private http: HttpClient, private dataservice: DataService, private navCtrl: NavController) {
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
    // Obtener datos del cliente y dueño del estacionamiento almacenados en el servicio
    const duenoEstacionamientoData = this.dataservice.getDuenoEstacionamientoData();
    this.navCtrl.navigateForward('/inicio');
    // Verificar que los datos del cliente y del dueño del estacionamiento estén presentes
    if (!duenoEstacionamientoData) {
      console.error('Error: Faltan datos del dueño del estacionamiento.');
      return;
    }

    // Realizar el INSERT INTO en la tabla 'dueno_estacionamiento' antes que el de 'estacionamiento'
    this.http.post('http://localhost:3000/registrarDuenoEstacionamiento', duenoEstacionamientoData).subscribe(
      (duenoResult) => {
        console.log('Dueño del estacionamiento registrado correctamente:', duenoResult);

        // Realizar el INSERT INTO en la tabla 'estacionamiento' después de registrar el dueño del estacionamiento
        this.http.post('http://localhost:3000/registrarEstacionamiento', {
          direccion_est: this.direccion_est,
          tarifa_hora: this.tarifa_hora,
          dueno_estacionamiento_rut_dueno: duenoEstacionamientoData.rut_dueno,
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
      },
      (duenoError) => {
        console.error('Error al registrar dueño del estacionamiento:', duenoError);
      }
    );
  }
}


