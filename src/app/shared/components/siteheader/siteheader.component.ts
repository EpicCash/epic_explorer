import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TransServiceService } from '../../services/trans-service.service';

@Component({
  selector: 'epic-explorer-siteheader',
  templateUrl: './siteheader.component.html',
  styleUrls: ['./siteheader.component.css'],
})
export class SiteheaderComponent implements OnInit {
  search: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public translate: TransServiceService
  ) {}

  ngOnInit() {}

  public ChangeTheme() {
    this.document.body.classList.toggle('dark_theme');
  }

  public getNetwork(){
    if(localStorage.getItem('network') == null){
      return "Testnet";
     }else{
       return localStorage.getItem('network');
    }   
 }

  public onChangeNetwork(networkValue){
    localStorage.setItem('network', networkValue);
    window.location.reload();

   }

  onSearch(hash) {
    this.router.navigate(['blockdetail', hash]);
  }
}
