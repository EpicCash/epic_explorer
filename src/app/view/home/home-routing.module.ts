import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeWorksapceComponent } from './home-worksapce.component';

const routes: Routes = [
  {
    path: '',
    component: HomeWorksapceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
