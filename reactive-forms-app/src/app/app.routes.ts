import { Routes } from '@angular/router';
import { reactiverRoutes } from './reactive/reactive.routes';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () =>
      import('./reactive/reactive.routes').then((m) => m.reactiverRoutes),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },

  {
    path: 'country',
    loadChildren: () =>
      import('./country/country.routes').then((m) => m.countryRoutes),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
