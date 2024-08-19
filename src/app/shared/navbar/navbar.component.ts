import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  socketService = inject(SocketService);

  user = localStorage.getItem('user');
  userEmail = this.user ? JSON.parse(this.user).email : '';

  constructor() {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.socketService.emit('userLogout', this.userEmail);
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        localStorage.removeItem('user');
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.router.navigate(['/login']);
  }
}
