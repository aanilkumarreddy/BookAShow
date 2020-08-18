import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MovieModule } from './features/movie/movie.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/movie/movie.module').then((m) => m.MovieModule),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./features/booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
