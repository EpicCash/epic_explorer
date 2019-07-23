import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './view/home/not-found/not-found.component';

export const routes: Routes = [
 // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: './view/view.module#ViewModule',
  },
  // { path: '**', redirectTo: 'home' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
