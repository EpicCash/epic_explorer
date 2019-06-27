import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'epic-explorer-home-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {
  screenHeight: number;
  constructor() {
    this.screenHeight = window.innerHeight;
  }
  ngOnInit() {}

  ngAfterViewInit() {}
}
