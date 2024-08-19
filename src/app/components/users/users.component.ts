import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  router = inject(Router);
  userService = inject(UsersService);
  socketService = inject(SocketService);

  user = localStorage.getItem('user');
  userId = this.user ? JSON.parse(this.user).id : '';

  constructor() {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
    if (localStorage.getItem('token')) {
      this.userService
        .getUsers()
        .pipe(
          map((users: any) =>
            users.filter((user: any) => user._id !== this.userId)
          )
        )
        .subscribe((users: any) => {
          this.users = users;
        });
      this.socketService
        .listen('getUsers')
        .pipe(
          map((users: any) =>
            users.filter((user: any) => user._id !== this.userId)
          )
        )
        .subscribe((user: any) => {
          // console.log(user);
          this.users = user;
        });
    }
  }

  onUserClick(user: any) {
    this.router.navigate(['/chat', user._id]);
  }
}
