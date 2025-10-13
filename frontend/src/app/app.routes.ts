import { Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Ruta por defecto - redirige al login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // Ruta pública - Login
  {
    path: 'login',
    component: LoginComponent
  },

  // Rutas privadas - Protegidas con authGuard
  // Por ahora solo definimos la ruta del dashboard (se implementará en la siguiente fase)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./components/private/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },

  // Ruta wildcard - redirige al login si la ruta no existe
  {
    path: '**',
    redirectTo: '/login'
  }
];
