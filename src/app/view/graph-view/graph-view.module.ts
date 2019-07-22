import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphViewRoutingModule } from './graph-view-routing.module';
import { GraphViewWorkspaceComponent } from './graph-view-workspace.component';
import { GraphDetailComponent } from './graph-detail/graph-detail.component';
import { HomeModule } from '../home/home.module';
import { SharedModule } from '../../shared/shared.module';

import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TransServiceService } from '../../shared/services/trans-service.service';
import { ChartService} from '../../shared/services/chart.service';
import { CustomLoader } from 'src/app/app.module';



@NgModule({
  declarations: [GraphViewWorkspaceComponent, GraphDetailComponent],
  imports: [CommonModule, GraphViewRoutingModule, HomeModule,SharedModule,
    TranslateModule.forChild({
      loader: {provide: TranslateLoader, useClass: CustomLoader, deps : [HttpClient]},         
  })
  ],
  providers: [TransServiceService,CookieService,ChartService],
})
export class GraphViewModule {}
