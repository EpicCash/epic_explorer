import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Utils } from 'src/app/shared/utils';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ChartService } from 'src/app/shared/services/chart.service';

@Component({
  selector: 'epic-explorer-home-worksapce',
  template: `
  <div class="body_bg py-4">
      <div class="chart_section mt-4">
        <div class="container">
        <div class="block_details mb-3">
      
        <app-block-detail-list></app-block-detail-list>
      
    </div>

    
<div class="row">
<div class="col-md-12">
    <div class="text-center detail_div">
      <p class="count mb-0">
      <span class="">Countdown to Halving</span> {{ targetBlock }} <span class="">Blocks to go</span> {{demo}}</p>
    </div>
  </div>
  </div>

          <div class="explore_charts pt-3">
            <epic-explorer-graph-list
              [viewchart]="viewchartvar"
            ></epic-explorer-graph-list>
          </div>
        </div>
        <div
          *ngIf="viewchartvar"
          routerLink="/all"
          class="text-center my-3"
        >
         <!-- <button class="btn btn_primary align-middle">
            View All Charts <i class="fa fa-long-arrow-right ml-3 "></i>
          </button> -->
        </div>
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
  viewchartvar: boolean;
  countDownDate: any;
  demo: any;
  targetBlock;
  constructor(@Inject(DOCUMENT) public document: Document,
  private router: Router,private route: ActivatedRoute,private titleService: Title, private chartService: ChartService) {
    super(document);
    if (this.router.url == '/all') {
      this.viewchartvar = false;
    } else {
      this.viewchartvar = false;
    }
    this.targetBlock = environment.TARGETBLOCK;
  }

  ngOnInit() {
    this.titleService.setTitle(
      this.route.snapshot.data.title,
    );
    
new Promise((resolve, reject) => {
  this.chartService
    .apiGetRequest("", "/blockchain_block/latesblockdetails")
    .subscribe(
      res => {
        if (res["status"] == 200) {
          this.countDownDate = environment.TARGETBLOCK - res.response.block_height;
          resolve();
        }
      },
      error => {}
    );
});

    var d1 = new Date ();
    
      let x = setInterval(() => {
      var d2 = new Date ( d1 );
      d2.setMinutes ( d1.getMinutes() + this.countDownDate );
      let now = new Date().getTime();
      let distance = d2.getTime() - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      this.demo = days + ' days ' + hours + ' hours ' + minutes + ' mins ' + seconds + ' sec';
  
      if (distance < 0) {
        clearInterval(x);
        this.demo = 'Expired...';
      }
    }, 1000);
  }

  viewchartenable() {
    this.viewchartvar = false;
  }
  ngAfterViewInit() {
    this.removeLoader();
  }
}
