import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigate(['/dashboard']); // Redirige a la pantalla post-login
    return false;
  }

  return true; // Permite Home/Login/Register solo si NO está logueado
};
