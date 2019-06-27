import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChartService } from '../../../shared/services/chart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css'],
})
export class BlockDetailComponent implements OnInit {
  public hashdata: any;
  public hasdata: boolean = true;
  public params: any;

  constructor(
    private route: ActivatedRoute,
    private chartService: ChartService,
    activate_route: ActivatedRoute,
  ) {
    activate_route.params.subscribe(val => {
      this.params = this.route.snapshot.params.hash;

      this.viewhash(this.params);
    });
  }

  ngOnInit() {}

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
