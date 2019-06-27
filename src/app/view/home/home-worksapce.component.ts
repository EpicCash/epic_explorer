import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'epic-explorer-home-worksapce',
  template: `
    <div class="body_bg py-4">
      <div class="chart_section mt-4">
        <div class="container">
          <div class="explore_charts pt-3">
            <epic-explorer-graph-list
              [viewchart]="viewchartvar"
            ></epic-explorer-graph-list>
          </div>
        </div>
        <div
          *ngIf="viewchartvar"
          (click)="viewchartenable()"
          class="text-center my-3"
        >
          <button class="btn btn_primary align-middle">
            View All Charts <i class="fa fa-long-arrow-right ml-3 "></i>
          </button>
        </div>
      </div>
    </div>
    <div class="block_details mt-5">
      <div class="container">
        <app-block-detail-list></app-block-detail-list>
      </div>
    </div>
    <div class="latest_blocks my-5">
      <div class="container">
        <div class="filter_shadow">
          <epic-explorer-latestblocks></epic-explorer-latestblocks>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeWorksapceComponent extends Utils
  implements OnInit, AfterViewInit {
  viewchartvar: boolean = true;
  constructor(@Inject(DOCUMENT) public document: Document) {
    super(document);
  }

  ngOnInit() {}

  viewchartenable() {
    this.viewchartvar = false;
  }
  ngAfterViewInit() {
    this.removeLoader();
  }
}
