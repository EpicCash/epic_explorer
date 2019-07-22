import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SiteLayoutComponent } from './components/layouts/site-layout/site-layout.component';
import { SiteheaderComponent } from './components/siteheader/siteheader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TransServiceService } from '../shared/services/trans-service.service';
import { ChartService} from '../shared/services/chart.service';

import { PlotlyComponent } from './components/plotly/plotly.component';
import { CustomLoader } from '../app.module';


const components = [
  HeaderComponent,
  FooterComponent,
  HomeLayoutComponent,
  SearchComponent,
  SiteLayoutComponent,
  SiteheaderComponent,
  PlotlyComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {provide: TranslateLoader, useClass: CustomLoader, deps : [HttpClient]},         
  })
  ],
  providers: [TransServiceService,CookieService,ChartService],
})
export class SharedModule {}
