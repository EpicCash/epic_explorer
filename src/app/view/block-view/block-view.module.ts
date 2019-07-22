import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockViewRoutingModule } from './block-view-routing.module';
import { BlockViewWorkspaceComponent } from './block-view-workspace.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';

import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TransServiceService } from '../../shared/services/trans-service.service';
import { ChartService} from '../../shared/services/chart.service';
import { CustomLoader } from 'src/app/app.module';

@NgModule({
  declarations: [BlockViewWorkspaceComponent, BlockDetailComponent],
  imports: [CommonModule, BlockViewRoutingModule,
    TranslateModule.forChild({
      loader: {provide: TranslateLoader, useClass: CustomLoader, deps : [HttpClient]},         
  })],
  providers: [TransServiceService,ChartService],
})
export class BlockViewModule {}
