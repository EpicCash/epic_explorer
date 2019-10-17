import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ChartService } from '../../services/chart.service';
import { TransServiceService } from '../../services/trans-service.service';
import {  HttpParams } from '@angular/common/http';

@Component({
  selector: 'epic-explorer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  TimeArr: any;
  showContent=true;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private chartService: ChartService,
    public translate: TransServiceService
  ) {}

  ngOnInit() {
    var self = this;
    var x = setInterval(function() {
      self.TimeArr = self.chartService.GetTimer()
        ? self.chartService.GetTimer()
        : false;
    }, 1000);
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

  public ChangeTheme() {
    this.document.body.classList.toggle('dark_theme');
  }

  public removeText(){
    this.showContent=0;
  }
}
