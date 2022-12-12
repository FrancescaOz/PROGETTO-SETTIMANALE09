import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start.component';

const routes: Routes = [
  {//rotta per vedere i film come home una volta loggato
    path: '',
    component: StartComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((c) => c.ProfileModule),
      },
      {
        path: 'movies',
        loadChildren: () =>
          import('../movies/movies.module').then((c) => c.MoviesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartRoutingModule {}
