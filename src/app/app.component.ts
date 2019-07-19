import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TransServiceService } from './shared/services/trans-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'explorer2-epic';
  constructor(private _cookieService: CookieService,public translate: TransServiceService){}
}
