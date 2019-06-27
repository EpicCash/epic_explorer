import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockViewWorkspaceComponent } from './block-view-workspace.component';

const routes: Routes = [
  {
    path: '',
    component: BlockViewWorkspaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockViewRoutingModule {}
