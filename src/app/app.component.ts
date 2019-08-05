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
  constructor(private _cookieService: CookieService,public translate: TransServiceService){
   console.log('cccc',caches.keys());
caches.keys().then((keys) => {
    keys.forEach((eachCacheName) => {
        let regExPat = /^(ngsw).*api.*/;
   //     if (regExPat.test(eachCacheName)) {
            caches.open(eachCacheName).then((eachCache) => {
                eachCache.keys().then((requests) => {
                    requests.forEach((eachRequest) => { eachCache.delete(eachRequest); });
                });
            });
     //   }
    });
});
}
}
