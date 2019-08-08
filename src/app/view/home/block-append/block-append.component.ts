import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-append',
  templateUrl: './block-append.component.html',
  styleUrls: ['./block-append.component.css'],
})
export class BlockAppendComponent implements OnInit {
  public blockdetails: any;
  public clickValue: any;

  constructor() {}

  ngOnInit() {
    //console.log(this.blockdetails);
  }

  public onClickPlus(height) {
    // this.beforeClick = true;
    this.clickValue = 'hash_' + height;
  }

  public onClickMinus(height) {
    this.clickValue = 0;
  }
}
