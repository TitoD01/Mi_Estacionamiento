// regvehiculo.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

interface ModelosPorMarca {
  [key: number]: string[];
}

@Component({
  selector: 'app-regvehi',
  templateUrl: './regvehi.page.html',
  styleUrls: ['./regvehi.page.scss'],
})
export class RegvehiPage implements OnInit {
  marcas: any[] = [];
  patente: string = '';
  marcaId: number = 0;
  modelo: string = '';
  anno: number = 0;
  modelos: string[] = [];
  user: any;

  // Define manualmente los modelos para cada marca
  modelosPorMarca: ModelosPorMarca = {
    1: ['Camry', 'Corolla', 'Prius', 'Avalon', 'Yaris', 'RAV4', 'Highlander', '4Runner', 'Sequoia', 'Land Cruiser', 'C-HR', 'Tacoma', 'Tundra', 'Prius', 'RAV4 Hybrid', 'Camry Hybrid', 'Highlander Hybrid', 'Land Cruiser', '4Runner', 'Sequoia', 'Mirai'], // Toyota
    2: ['Spark', 'Sonic', 'Cruze', 'Malibu', 'Impala', 'Camaro' , 'Corvette', 'Equinox', 'Traverse', 'Tahoe', 'Suburban', 'Trax', 'Blazer', 'Tracker', 'Colorado (camioneta)', 'Silverado (camioneta)', 'Express (furgoneta)'], // Chevrolet
    3: ['Accent', 'Elantra', 'Ioniq', 'Sonata', 'Veloster', 'Kona', 'Tucson', 'Santa Fe', 'Palisade', 'Venue', 'Nexo'], // Hyundai
    4: ['Rio', 'Forte', 'Optima', 'Cadenza', 'Stinger', 'Soul', 'Niro', 'Sportage', 'Seltos', 'Telluride', 'Sorento', 'Carnival'], // Kia
    5: ['Versa', 'Sentra', 'Altima', 'Maxima', '370Z', 'GT-R', 'Kicks', 'Rogue Sport', 'Rogue', 'Murano', 'Pathfinder', 'Armada', 'Frontier', 'Titan'], // Nissan
    6: ['Golf', 'Jetta', 'Passat', 'Arteon', 'Tiguan', 'Atlas', 'Taos', 'ID.4'], // Volkswagen
    7: ['Mirage', 'G4', 'Eclipse Cross', 'Outlander Sport', 'Outlander', 'Pajero', 'Montero Sport'], // Mitsubishi
    8: ['Fiesta', 'Focus', 'Fusion', 'Mustang', 'Escape', 'Edge', 'Explorer', 'Expedition', 'Ranger', 'F-150', 'Super Duty', 'Bronco Sport', 'Maverick'], // Ford
    9: ['Swift', 'Ignis', 'Vitara', 'Jimny', 'S-Cross'], // Suzuki
    10: ['Mazda2', 'Mazda3', 'Mazda6', 'MX-5 Miata', 'CX-3', 'CX-30', 'CX-5', 'CX-9'], // Mazda
    
    // Agrega otras marcas según sea necesario
  };

  constructor(private http: HttpClient, private dataservice: DataService, private navCtrl: NavController, private authService:AuthService) {}

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

  cargarModelos() {
    // Obtener el objeto de la marca seleccionada
    const marcaSeleccionada = this.marcas.find((marca) => marca.id_marca === this.marcaId);

    // Verificar que la marca seleccionada esté presente
    if (!marcaSeleccionada) {
      console.error('Error: No se ha seleccionado una marca válida.');
      return;
    }

    // Obtener los modelos asociados a la marca seleccionada desde la lógica interna
    this.modelos = this.modelosPorMarca[marcaSeleccionada.id_marca] || [];
  }

  registrarVehiculo() {
    // Obtener datos del cliente almacenados en el servicio
    this.user = this.authService.getCurrentUser();
    this.navCtrl.navigateForward('/inicio');


        // Realizar el INSERT INTO en la tabla 'vehiculo' después de registrar el cliente
        this.http.post('http://localhost:3000/registrarVehiculo', {
          patente: this.patente,
          descripcion_modelo: this.modelo, // Cambiado a 'descripcion_modelo'
          anno: this.anno,
          cliente_rut_cli: this.user.rut_cli,
          marca_id_marca: this.marcaId,
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
  }
}
