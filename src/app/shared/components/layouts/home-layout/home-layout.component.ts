import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'epic-explorer-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
})
export class HomeLayoutComponent implements OnInit, AfterViewInit {
  screenHeight: number;
  constructor() {
    this.screenHeight = window.innerHeight;
  }
  ngOnInit() {}

  ngAfterViewInit() {}
}
