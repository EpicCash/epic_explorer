import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphViewRoutingModule } from './graph-view-routing.module';
import { GraphViewWorkspaceComponent } from './graph-view-workspace.component';
import { GraphDetailComponent } from './graph-detail/graph-detail.component';
import { HomeModule } from '../home/home.module';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [GraphViewWorkspaceComponent, GraphDetailComponent],
  imports: [CommonModule, GraphViewRoutingModule, HomeModule,SharedModule
  ],
})
export class GraphViewModule {}
