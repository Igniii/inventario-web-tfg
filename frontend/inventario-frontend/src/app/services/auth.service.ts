import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8080/api/auth';
  private TOKEN_KEY = 'jwt_token';

  // Signal que notifica cambios
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
          this.isLoggedInSignal.set(true); // <-- Notifica al navbar
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSignal.set(false); // <-- Notifica al navbar
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }
}
