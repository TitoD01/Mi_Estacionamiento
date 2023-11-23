import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { NavController } from '@ionic/angular';

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

  constructor(private http: HttpClient, private dataservice: DataService, private navCtrl: NavController) {}

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
    // Obtener datos del cliente almacenados en el servicio
    const clienteData = this.dataservice.getClienteData();
    this.navCtrl.navigateForward('/inicio');
    // Verificar que los datos del cliente estén presentes
    if (!clienteData) {
      console.error('Error: Faltan datos del cliente.');
      return;
    }
  
    // Obtener el objeto de la marca seleccionada
    const marcaSeleccionada = this.marcas.find(marca => marca.id_marca === this.marcaId);
  
    // Verificar que la marca seleccionada esté presente
    if (!marcaSeleccionada) {
      console.error('Error: No se ha seleccionado una marca válida.');
      return;
    }

    // Realizar el INSERT INTO en la tabla 'cliente' antes que el de 'vehiculo'
    this.http.post('http://localhost:3000/registrarCliente', clienteData).subscribe(
      (clienteResult) => {
        console.log('Cliente registrado correctamente:', clienteResult);

        // Realizar el INSERT INTO en la tabla 'vehiculo' después de registrar el cliente
        this.http.post('http://localhost:3000/registrarVehiculo', {
          patente: this.patente,
          descripcion_modelo: this.modelo, // Cambiado a 'descripcion_modelo'
          anno: this.anno,
          cliente_rut_cli: clienteData.rut_cli,
          marca_id_marca: marcaSeleccionada.id_marca,
        }).subscribe(
          (vehiculoResult) => {
            console.log('Vehículo registrado correctamente:', vehiculoResult);
            // Restablecer los valores del formulario
            this.patente = '';
            this.marcaId = 0;
            this.modelo = '';
            this.anno = 0;
          },
          (vehiculoError) => {
            console.error('Error al registrar vehículo:', vehiculoError);
          }
        );
      },
      (clienteError) => {
        console.error('Error al registrar cliente:', clienteError);
      }
    );
  }
}
