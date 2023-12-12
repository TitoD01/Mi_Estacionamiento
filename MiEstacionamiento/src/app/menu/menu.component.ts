import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent{

  constructor() { }

  @Output() closeMenu = new EventEmitter<void>();

  // Puedes agregar opciones o lógica específica del menú aquí
  // ...

  close() {
    this.closeMenu.emit();
  }

}
