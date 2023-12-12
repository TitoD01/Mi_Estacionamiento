import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  @Output() closeMenu = new EventEmitter<void>();

  logout() {
    this.authService.logout();
    this.closeMenu.emit();
  }
}
