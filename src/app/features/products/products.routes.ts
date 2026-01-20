import { Routes } from '@angular/router';
export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products-list/products-list').then((c) => c.ProductsList),
  },
];
