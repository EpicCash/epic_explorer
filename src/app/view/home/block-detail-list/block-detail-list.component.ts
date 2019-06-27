import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../shared/services/chart.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-block-detail-list',
  templateUrl: './block-detail-list.component.html',
  styleUrls: ['./block-detail-list.component.css'],
})
export class BlockDetailListComponent implements OnInit {
  public latestblockdetail: any = [];

  constructor(private chartService: ChartService) {}

  ngOnInit() {
    this.gettinglatesthashList();
  }

  public gettinglatesthashList() {
    this.chartService
      .apiGetRequest('', '/blockchain_block/latesblockdetails')
      .subscribe(
        res => {
          if (res['status'] == 200) {
            // var hasharray = res.response;
            this.latestblockdetail = res.response;
          }
        },
        error => {},
      );
  }
}
