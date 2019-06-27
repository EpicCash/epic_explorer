import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphViewWorkspaceComponent } from './graph-view-workspace.component';

const routes: Routes = [
  {
    path: ':hashid',
    component: GraphViewWorkspaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphViewRoutingModule {}
