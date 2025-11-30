import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="submit()">
      <input [(ngModel)]="username" name="username" placeholder="Usuario"/>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Contraseña"/>
      <button type="submit">Entrar</button>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.login(this.username, this.password)
      .subscribe({
        next: () => this.router.navigate(['/productos']),
        error: () => alert('Credenciales incorrectas')
      });
  }
}
