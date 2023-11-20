
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  { 
  comuna: string = '';
  searchResults: any[] = [];

constructor(private authService: AuthService) {}

search() {
  this.authService.searchByComuna(this.comuna).subscribe(
    (results) => {
      this.searchResults = results;
    },
    (error) => {
      console.error('Error en la búsqueda:', error);
    }
  );
}
}