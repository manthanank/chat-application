import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private tokenExpirationTimer: any;

  http = inject(HttpClient);
  router = inject(Router);

  constructor() {
    this.autoLogin();
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        this.handleAuthentication(response.token, response.expiresIn);
      })
    );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        this.handleAuthentication(response.token, response.expiresIn);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  redirectToHome() {
    this.router.navigate(['/users']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    const user = localStorage.getItem('user');
    const email = user ? JSON.parse(user).email : '';
    return this.http.post(`${this.apiUrl}/logout`, {
      email: email,
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/${token}`, {
      password,
    });
  }

  private handleAuthentication(token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpirationDate', expirationDate.toISOString());
    this.autoLogout(expiresIn * 1000);
  }

  autoLogin() {
    const token = this.getToken();
    const expirationDate = new Date(
      localStorage.getItem('tokenExpirationDate') || ''
    );
    if (!token || expirationDate <= new Date()) {
      this.logout();
      return;
    }
    const expiresIn = expirationDate.getTime() - new Date().getTime();
    this.autoLogout(expiresIn);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}