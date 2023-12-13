import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { DataService } from './data.service';
import { Router } from '@angular/router';
export interface Tarjeta {
  n_tarjeta: string;
  nombre_banco: string;
}

export interface User {
  // ... Otras propiedades del usuario
  id: number; // Asumiendo que hay un ID único para cada usuario
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private user: any;
  public tipoUsuario!: string;
  private currentUser: any;

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) {}

  login(credentials: { nombre_usuario: string; rut: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: any) => {
          console.log('Respuesta del inicio de sesión:', response);
  
          if (response.message === 'Inicio de sesión exitoso' && response.user && response.tipoUsuario) {
            console.log('Información del usuario:', response.user);
            this.setUser(response.user, response.tipoUsuario);
            localStorage.setItem('tipoUsuario', response.tipoUsuario);
          } else {
            console.error('Respuesta de inicio de sesión incompleta:', response);
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
    this.user = user || {};
    this.tipoUsuario = tipoUsuario || '';
    this.currentUser = { ...user }; // Almacena una copia del usuario para evitar modificaciones inesperadas
  
    if (this.tipoUsuario === 'cliente') {
      this.currentUser.nombre = user.nombre_cli;
      this.currentUser.apellido = user.apellido_cli;
      this.currentUser.rut = user.rut_cli;
    } else if (this.tipoUsuario === 'dueno_estacionamiento') {
      this.currentUser.nombre = user.nombre_dueno;
      this.currentUser.apellido = user.apellido_dueno;
      this.currentUser.rut = user.rut_dueno;
    }
  }

getCurrentUser(): any {
  return this.user;
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
  localStorage.removeItem('tipoUsuario'); // Limpiar el tipo de usuario almacenado
  this.router.navigate(['/home']);
  this.setUser(null, null); // Establecer ambos valores como null
}

getTarjetasUsuarioActual(): Observable<Tarjeta[]> {
  const rutCliente = this.user.rut_cli;

  return this.http.get<Tarjeta[]>(`${this.apiUrl}/tarjetas/${rutCliente}`)
    .pipe(
      catchError(error => {
        console.error('Error al obtener tarjetas:', error);
        throw error;
      })
    );
}

getBancos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/bancos`)
    .pipe(
      catchError(error => {
        console.error('Error al obtener bancos:', error);
        throw error;
      })
    );
}

insertarTarjeta(numeroTarjeta: string, cvv: string, fechaExpiracion: string, clienteRut: string, bancoId: number): Observable<any> {
  const body = {
    numeroTarjeta,
    cvv,
    fechaExpiracion,
    clienteRut,
    bancoId,
  };

  return this.http.post(`${this.apiUrl}/insertarTarjeta`, body)
    .pipe(
      tap((response: any) => {
        console.log('Respuesta de inserción de tarjeta:', response);
      }),
      catchError(error => {
        console.error('Error en la inserción de tarjeta:', error);
        throw error;
      })
    );
}

getVehiculosUsuarioActual(): Observable<any[]> {
  const rutCliente = this.user.rut_cli;

  return this.http.get<any[]>(`${this.apiUrl}/vehiculos/${rutCliente}`)
    .pipe(
      catchError(error => {
        console.error('Error al obtener vehículos del usuario:', error);
        throw error;
      })
    );
}

getEstacionamientosUsuarioActual(): Observable<any[]> {
  const rutDuenoEstacionamiento = this.user.rut_dueno;

  return this.http.get<any[]>(`${this.apiUrl}/estacionamientos/${rutDuenoEstacionamiento}`)
    .pipe(
      catchError(error => {
        console.error('Error al obtener estacionamientos del usuario:', error);
        throw error;
      })
    );
}

}

