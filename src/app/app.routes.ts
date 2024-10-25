import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./atomic-ui/pages/page-landing/page-landing.component').then(m => m.PageLandingComponent)
  }
];
