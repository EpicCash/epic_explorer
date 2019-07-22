import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChartService } from '../../../shared/services/chart.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BlockDetailListComponent } from '../../home/block-detail-list/block-detail-list.component';

import { TransServiceService } from '../../../shared/services/trans-service.service';

@Component({
  providers: [BlockDetailListComponent],
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css'],
})
export class BlockDetailComponent implements OnInit {
  TimeArr: any;
  public hashdata: any;
  public hasdata: boolean = true;
  public params: any;
  public latestblockHeight: any;

  constructor(
    private route: ActivatedRoute,
    private chartService: ChartService,
    activate_route: ActivatedRoute,
     private titleService: Title,
    private latestcomp: BlockDetailListComponent,
    public translate: TransServiceService
  ) {
    activate_route.params.subscribe(val => {
      this.params = this.route.snapshot.params.hash;

      this.viewhash(this.params);
    });
  }

  ngOnInit() {
	var self = this;
    var x = setInterval(function() {
      self.TimeArr = self.chartService.GetTimer()
        ? self.chartService.GetTimer()
        : false;
    }, 1000);
    this.titleService.setTitle(this.route.snapshot.data.title);
    this.latestcomp.gettinglatesthashList().then(res => {
      this.latestblockHeight = this.latestcomp.latestblockdetail.block_height;
    });
   }

  public viewhash(hashid) {
    this.chartService
      .apiGetRequest('', '/blockchain_block/' + hashid)
      .subscribe(
        res => {
          if (res['status'] == 200) {
            this.hasdata = true;
            this.hashdata = res.response;
          }
        },
        error => {
          this.hasdata = false;
        },
      );
  }
}
