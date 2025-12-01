import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8080/api/auth';
  private TOKEN_KEY = 'jwt_token';

  // Señal que notifica login/logout
  isLoggedInSignal = signal(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, { username, password })
      .pipe(
        tap(resp => {
          localStorage.setItem(this.TOKEN_KEY, resp.token);
          this.isLoggedInSignal.set(true);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSignal.set(false);
  }

  register(data: { username: string; password: string }) {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ==========================================
  // EXTRAER ROL DEL JWT
  // ==========================================
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'USER';
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }
}
