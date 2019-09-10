import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../shared/components/layouts/home-layout/home-layout.component';
import { SiteLayoutComponent } from '../shared/components/layouts/site-layout/site-layout.component';
import {  ApiViewComponent } from '../view/api-view/api-view.component';
const viewRoutes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
    data: {
      title: 'Epic Explorer - Home',
    },
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
    data: {
        title: 'Epic Explorer - Block',
      },
  },
  {
    path: 'chart',
    loadChildren: './graph-view/graph-view.module#GraphViewModule',
    data: {
      title: 'Epic Explorer',
    },
  },
  {
    path: 'api-view',
    component: ApiViewComponent
  }
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
