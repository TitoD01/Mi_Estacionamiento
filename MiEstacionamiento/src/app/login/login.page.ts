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
        this.router.navigate(['/inicio']);
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
