import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  credentials = { nombre_usuario: '', rut: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
        (response) => {
            console.log('Inicio de sesión exitoso:', response);

            // Obtiene el tipo de usuario desde localStorage
            const userType = this.authService.getTipoUsuarioLocalStorage();

            if (userType === 'cliente') {
                this.router.navigate(['/inicio']);
            } else if (userType === 'dueno_estacionamiento') {
                this.router.navigate(['/inicio']);
            } else {
                console.error('Tipo de usuario no reconocido:', userType);
                // Puedes manejar este caso según tus necesidades
            }
        },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales inválidas';

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }
}
