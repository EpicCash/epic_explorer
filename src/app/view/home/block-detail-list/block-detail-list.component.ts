import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from '../../../shared/services/chart.service';
import { HttpParams } from '@angular/common/http';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TransServiceService } from '../../../shared/services/trans-service.service';

@Component({
  selector: 'app-block-detail-list',
  templateUrl: './block-detail-list.component.html',
  styleUrls: ['./block-detail-list.component.css'],
})
export class BlockDetailListComponent implements OnInit {
  public latestblockdetail: any = [];
  public prevouslatestblockdetails: any = [];
  public latestblockdetailObservable: any;
  private server = environment.domain;
  private socket;
  @ViewChild('minhgt', {static: false}) elementView: ElementRef;

  minHeight: number;

  constructor(private chartService: ChartService,public translate: TransServiceService) {
    // this.chartService.createSocketConnection();
  }
  
  ngOnInit() {
    this.gettinglatesthashList();
    this.getBlockDetails();

  }

  ngAfterViewInit() {
    this.minHeight = this.elementView.nativeElement.offsetHeight;
  }

getBlockDetails() {
    this.latestblockdetailObservable = this.chartService
      .getLatestblockdetails()
      .subscribe(response => {
        this.prevouslatestblockdetails = this.latestblockdetail;
        this.latestblockdetail = response;
        if (
          this.prevouslatestblockdetails.block_height !=
          this.latestblockdetail.block_height
        ) {
          this.latestblockdetail['blink'] = true;
        } else {
          this.latestblockdetail['blink'] = false;
        }
        //console.log(this.latestblockdetail);
      });
  }
  
  public gettinglatesthashList() {
    return new Promise((resolve, reject) => {
      this.chartService
        .apiGetRequest('', '/blockchain_block/latesblockdetails')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              // var hasharray = res.response;
              this.latestblockdetail = res.response;
              this.latestblockdetail['blink'] = false;
              resolve();
            }
          },
          error => {},
        );
    });
  }

  ngOnDestroy() {
    this.latestblockdetailObservable
      ? this.latestblockdetailObservable.unsubscribe()
      : null;
  }
}
