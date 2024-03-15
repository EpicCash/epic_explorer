import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './view-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TransServiceService } from '../shared/services/trans-service.service';
import { ChartService} from '../shared/services/chart.service';
import { CustomLoader } from '../app.module';
import { ApiViewComponent } from './api-view/api-view.component';
import { LocationComponent } from './location/location.component';

@NgModule({
  declarations: [ApiViewComponent, LocationComponent],
  imports: [CommonModule, ViewRoutingModule, SharedModule,
    TranslateModule.forChild({
      loader: {provide: TranslateLoader, useClass: CustomLoader, deps : [HttpClient]},         
  })
  ],
  providers: [TransServiceService,CookieService,ChartService],
})
export class ViewModule {}
