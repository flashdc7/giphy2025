import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: ()=> import('./gifs/pages/dashboard-page/dashboard-page'),
    children:[
      {
        path: 'trending',
        loadComponent: ()=> import('./gifs/pages/trending-page-component/trending-page-component'),
      },
      {
        path: 'search',
        loadComponent: ()=> import('./gifs/pages/search-page-component/search-page-component'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      }
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  }
];
