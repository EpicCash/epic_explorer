import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../shared/components/layouts/home-layout/home-layout.component';
import { SiteLayoutComponent } from '../shared/components/layouts/site-layout/site-layout.component';

const viewRoutes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'all',
    loadChildren: './home/home.module#HomeModule',
    data: {
      title: 'Epic Explorer - Home',
    },
  }
];

const siteRoutes: Routes = [
  {
    path: 'blockdetail/:hash',
    loadChildren: './block-view/block-view.module#BlockViewModule',
  },
  {
    path: 'chart',
    loadChildren: './graph-view/graph-view.module#GraphViewModule',
    data: {
      title: 'Epic Explorer',
    },
  },
];

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: viewRoutes,
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: siteRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
