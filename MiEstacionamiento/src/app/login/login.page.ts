import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  credentials = { nombre_cli: '', rut_cli: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        // Redirigir a la página home
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        // Mostrar mensaje de error
        this.errorMessage = 'Credenciales inválidas';
        
        // Configurar un temporizador para borrar el mensaje después de 3 segundos (3000 ms)
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000); // 3000 ms = 3 segundos
      }
    );
  }
}
