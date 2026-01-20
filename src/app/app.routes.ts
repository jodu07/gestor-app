import { Layout } from './shared/ui/layout/layout/layout';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/ui/layout/layout/layout').then((c) => c.Layout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes').then((r) => r.PRODUCTS_ROUTES),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  { path: '**', redirectTo: 'dashboard' },
];
