import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TransServiceService{
  public langLabel: any = {};

  constructor(public translate : TranslateService,private cookie: CookieService) { 
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    this.langLabel = {en: 'English', es: 'Spanish'};
    // console.log('this.getCookie() ifconf',this.getCookie() != 'undefined' ? 1: 2);
    console.log("(this.getCookie() && this.getCookie() != null) ? this.getCookie() : (this.getCurrentLang() && this.getCurrentLang() != null) ? this.getCurrentLang() : 'en'",(this.getCookie() && this.getCookie() != 'undefined') ? this.getCookie() : (this.getCurrentLang() && this.getCurrentLang() != 'undefined') ? this.getCurrentLang() : 'en');
    translate.use((this.getCookie() && this.getCookie() != 'undefined') ? this.getCookie() : (this.getCurrentLang() && this.getCurrentLang() != 'undefined') ? this.getCurrentLang() : 'en');
    
    this.setCookie(this.getCurrentLang());
  }

  public getLanguage(){
    return this.translate.getLangs();
  }

  public getCurrentLang(){
    return this.translate.currentLang;
  }

  public changeLang(langSelect){
    this.translate.use(langSelect);
    this.setCookie(langSelect);
  }

  public setCookie(lang){
    this.cookie.set('Lang',lang);
  }

  public getCookie(){
    return this.cookie.get('Lang');
  }
}
