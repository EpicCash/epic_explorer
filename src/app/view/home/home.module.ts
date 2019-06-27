import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeWorksapceComponent } from './home-worksapce.component';
import { LatestblocksComponent } from './latestblocks/latestblocks.component';
import { GraphListComponent } from './graph-list/graph-list.component';
import { BlockDetailListComponent } from './block-detail-list/block-detail-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    HomeWorksapceComponent,
    LatestblocksComponent,
    GraphListComponent,
    BlockDetailListComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class HomeModule {}
