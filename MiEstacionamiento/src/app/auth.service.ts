import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { DataService } from './data.service';
import { Router } from '@angular/router';
export interface Tarjeta {
  n_tarjeta: string;
  nombre_banco: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private user: any;
  public tipoUsuario!: string;

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) {}

  login(credentials: { nombre_usuario: string; rut: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
        .pipe(
            tap((response: any) => {
                console.log('Respuesta del inicio de sesión:', response);

                if (response.message === 'Inicio de sesión exitoso' && response.user && response.tipoUsuario) {
                    this.setUser(response.user, response.tipoUsuario);
                    // Guarda el tipo de usuario en localStorage
                    localStorage.setItem('tipoUsuario', response.tipoUsuario);
                } else {
                    console.error('Respuesta de inicio de sesión incompleta:', response);
                    // Puedes lanzar un error personalizado aquí si lo deseas.
                }
            }),
            catchError(error => {
                console.error('Error en el inicio de sesión:', error);
                throw error;
            })
        );
}

// Agrega esta función para obtener el tipo de usuario desde localStorage
getTipoUsuarioLocalStorage(): string {
    return localStorage.getItem('tipoUsuario') || '';
}


  searchByComuna(comuna: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?comuna=${comuna}`);
  }

  setUser(user: any, tipoUsuario: string | null = null) {
    this.user = user;
    this.tipoUsuario = tipoUsuario || ''; // Si no se proporciona tipoUsuario, establece una cadena vacía
  }

  getUser(): any {
    return this.user;
  }

  getTipoUsuario(): string {
    return this.tipoUsuario;
  }

  getVehiculos(): Observable<any[]> {
    // Obtener el rut del cliente desde el usuario logueado
    const rutCliente = this.user.rut_cli;

    return this.http.get<any[]>(`${this.apiUrl}/vehiculos/${rutCliente}`)
        .pipe(
            catchError(error => {
                console.error('Error al obtener vehículos:', error);
                throw error;
            })
        );
}

getTarjetas(): Observable<Tarjeta[]> {
  const rutCliente = this.user.rut_cli;

  return this.http.get<Tarjeta[]>(`${this.apiUrl}/tarjetas/${rutCliente}`)
    .pipe(
      catchError(error => {
        console.error('Error al obtener tarjetas:', error);
        throw error;
      })
    );
}

insertarArriendo(horarioInicio: string, horarioTermino: string, vehiculoPatente: string, estacionamientoId: number): Observable<any> {
  const body = {
    horarioInicio,
    horarioTermino,
    vehiculoPatente,
    estacionamientoId,
  };

  return this.http.post(`${this.apiUrl}/insertarArriendo`, body)
    .pipe(
      tap((response: any) => {
        console.log('Respuesta de inserción de arriendo:', response);
      }),
      catchError(error => {
        console.error('Error en la inserción de arriendo:', error);
        throw error;
      })
    );
}

realizarPago(detalle_pago: string): Observable<any> {
  const monto = this.dataService.getMonto();
  const body = {
    detalle_pago,
    monto,
  };

  return this.http.post(`${this.apiUrl}/realizarPago`, body)
    .pipe(
      tap((response: any) => {
        console.log('Respuesta de realizar pago:', response);
      }),
      catchError(error => {
        console.error('Error al realizar pago:', error);
        throw error;
      })
    );
}
logout() {
  // Implementa la lógica para cerrar la sesión aquí
  this.setUser(null, null); // Establecer ambos valores como null
  this.router.navigate(['/home']);
}
}