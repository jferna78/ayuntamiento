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
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./components/private/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    children: [
      // Rutas del módulo de proveedores
      {
        path: 'proveedores',
        loadComponent: () => import('./components/private/modules/proveedores/proveedor-list/proveedor-list.component')
          .then(m => m.ProveedorListComponent)
      },
      {
        path: 'proveedores/crear',
        loadComponent: () => import('./components/private/modules/proveedores/proveedor-create/proveedor-create.component')
          .then(m => m.ProveedorCreateComponent)
      },
      {
        path: 'proveedores/editar/:cif',
        loadComponent: () => import('./components/private/modules/proveedores/proveedor-edit/proveedor-edit.component')
          .then(m => m.ProveedorEditComponent)
      }
    ]
  },

  // Ruta wildcard - redirige al login si la ruta no existe
  {
    path: '**',
    redirectTo: '/login'
  }
];
