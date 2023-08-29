import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'locations',
    pathMatch: 'full',
  },
  {
    path: 'locations',
    loadComponent: () => import('./pages/locations/locations.page').then( m => m.LocationsPage)
  },
  {
    path: 'locations/:id',
    loadComponent: () => import('./pages/location-details/location-details.page').then( m => m.LocationDetailsPage)
  },
  {
    path: 'moods',
    loadComponent: () => import('./pages/moods/moods.page').then( m => m.MoodsPage)
  },
];
