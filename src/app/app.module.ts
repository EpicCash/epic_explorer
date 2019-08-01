import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TransServiceService } from './shared/services/trans-service.service';
import { ChartService} from './shared/services/chart.service';
import { NotFoundComponent } from './view/home/not-found/not-found.component';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class CustomLoader extends ChartService implements TranslateLoader {
  apiHost: string;
  
  constructor(public http: HttpClient ) {
    super(http)
  }
  
  public getTranslation(lang): Observable<any> {
    
    let params = new HttpParams();
    params = params.append('lang', lang);
    return this.apiGetRequest(params,'/blockchain_kernel/translator').pipe(
      map((res: any) => {
        return res;
      })
    );  
  }
}

@NgModule({
  declarations: [
    AppComponent,NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useClass: CustomLoader,
          // useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [TransServiceService,CookieService,ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor( ) {
  }
}
