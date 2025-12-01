import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si no logado → al login
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Si no es admin → a home o a donde quieras
  if (!auth.isAdmin()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
