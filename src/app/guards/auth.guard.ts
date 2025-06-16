import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getUserRole();
  const allowedRoles = route.data['roles'] as string[];
  console.log('userRole:', userRole);
  console.log('allowedRoles:', allowedRoles);

  if (allowedRoles && !allowedRoles.includes(userRole!)) {
    router.navigate(['/not-found']);
    return false;
  }

  return true;
};