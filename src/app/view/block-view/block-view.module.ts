import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockViewRoutingModule } from './block-view-routing.module';
import { BlockViewWorkspaceComponent } from './block-view-workspace.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';

@NgModule({
  declarations: [BlockViewWorkspaceComponent, BlockDetailComponent],
  imports: [CommonModule, BlockViewRoutingModule],
})
export class BlockViewModule {}
