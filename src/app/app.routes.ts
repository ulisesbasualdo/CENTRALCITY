import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/page-landing/page-landing.component')
  }
];
