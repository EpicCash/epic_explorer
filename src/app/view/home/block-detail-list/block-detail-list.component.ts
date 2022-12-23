import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ChartService } from "../../../shared/services/chart.service";
import { HttpParams } from "@angular/common/http";
import * as io from "socket.io-client";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { TransServiceService } from "../../../shared/services/trans-service.service";

@Component({
  selector: "app-block-detail-list",
  templateUrl: "./block-detail-list.component.html",
  styleUrls: ["./block-detail-list.component.css"]
})
export class BlockDetailListComponent implements OnInit {
  public latestblockdetail: any = [];
  public prevouslatestblockdetails: any = [];
  public latestblockdetailObservable: any;
  public epicData:any;
  private server = environment.domain;
  private socket;
  ShowSecondBlock = false;
  CTD_1;
  CTD_2;
  CTD_3;
  NW_1;
  NW_2;
  NW_3;
  Block_height;
  Block_latest;
  Block_supply;
  timeout_1;
  timeout_2;
  timeout_3;
  timeout_4;
  timeout_5;
  timeout_6;
  timeout_7;
  timeout_8;
  timeout_9;
  @ViewChild("minhgt", { static: false }) elementView: ElementRef;

  minHeight: number;
  apiInterval;

  constructor(
    private chartService: ChartService,
    public translate: TransServiceService
  ) {
    // this.chartService.createSocketConnection();
  }

  ngOnInit() {
    this.gettingprevioushashList();
    this.getBlockDetails();
    this.getEpicLTP();
    //console.log("Enter Nginit");

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.gettinglatesthashList(false);
      console.log('gettinglatesthashList v1');
      this.apiInterval = setInterval(() => {
        console.log('gettinglatesthashList v2');
        this.gettinglatesthashList(false);
        this.getEpicLTP();
      }, 60 * 1000);  
    }, 14 * 1000);
    // this.minHeight = this.elementView.nativeElement.offsetHeight;
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
          this.latestblockdetail["blink"] = true;
        } else {
          this.latestblockdetail["blink"] = false;
        }
        //console.log(this.latestblockdetail);
      });
  }

  public getEpicLTP() {
    return new Promise<void>((resolve, reject) => {
      this.chartService
        .apiGetEpicLTP()
        .subscribe(
          res => {
            if (res["msg"] == 'ok') {
              console.log(res.data);
              this.epicData = res.data;
              resolve();
            }
          },
          error => {}
        );
    });
  }

  public gettingprevioushashList() {
    return new Promise<void>((resolve, reject) => {
      this.chartService
        .apiGetRequest("", "/blockchain_block/previousblockdetails")
        .subscribe(
          res => {
            if (res["status"] == 200) {
              // var hasharray = res.response;
              this.latestblockdetail = res.response;
              // setInterval(() => this.incrementseconds(), 1000);
              this.latestblockdetail["blink"] = false;
                setTimeout(() => {
                  this.ShowSecondBlock = true;
                }, 4000);
                this.Block_height = res.response.block_height;
                this.Block_latest = res.response.letest_block_num;
                this.Block_supply = res.response.coin_existence;
                this.CTD_1 = res.response.targetdifficultycuckatoo;
                this.NW_1 = res.response.cuckoohashrate;
                setTimeout(() => {
                  this.CTD_2 = res.response.targetdifficultyprogpow;
                  this.NW_2 = res.response.progpowhashrate;
                }, 8000);
                setTimeout(() => {
                  this.CTD_3 = res.response.targetdifficultyrandomx;
                  this.NW_3 = res.response.randomxhashrate;
                }, 12000);
              resolve();
            }
          },
          error => {}
        );
    });
  }
  
  public gettinglatesthashList(init) {
    return new Promise<void>((resolve, reject) => {
      this.chartService
        .apiGetRequest("", "/blockchain_block/latesblockdetails")
        .subscribe(
          res => {
            if (res["status"] == 200) {
              // var hasharray = res.response;
              this.latestblockdetail = res.response;
              // setInterval(() => this.incrementseconds(), 1000);
              this.latestblockdetail["blink"] = false;
              if(init){
                setTimeout(() => {
                  this.ShowSecondBlock = true;
                }, 4000);
                this.Block_height = res.response.block_height;
                this.Block_latest = res.response.letest_block_num;
                this.Block_supply = res.response.coin_existence;
                this.CTD_1 = res.response.targetdifficultycuckatoo;
                this.NW_1 = res.response.cuckoohashrate;
                setTimeout(() => {
                  this.CTD_2 = res.response.targetdifficultyprogpow;
                  this.NW_2 = res.response.progpowhashrate;
                }, 10000);
                setTimeout(() => {
                  this.CTD_3 = res.response.targetdifficultyrandomx;
                  this.NW_3 = res.response.randomxhashrate;
                }, 15000);
              }else{
                this.timeout_1 = setTimeout(() => {
                  this.Block_height = res.response.block_height;
                }, 5*1000);
                this.timeout_2 = setTimeout(() => {
                  this.Block_latest = res.response.letest_block_num;
                }, 10*1000);
                this.timeout_3 = setTimeout(() => {
                  this.Block_supply = res.response.coin_existence;
                }, 15*1000);
                this.timeout_4 = setTimeout(() => {
                  this.NW_1 = res.response.cuckoohashrate;
                }, 20*1000);
                this.timeout_5 = setTimeout(() => {
                  this.NW_2 = res.response.progpowhashrate;
                }, 25*1000);
                this.timeout_6 = setTimeout(() => {
                  this.NW_3 = res.response.randomxhashrate;
                }, 30*1000);
                this.timeout_7 = setTimeout(() => {
                  this.CTD_1 = res.response.targetdifficultycuckatoo;
                }, 35*1000);
                this.timeout_8 = setTimeout(() => {
                  this.CTD_2 = res.response.targetdifficultyprogpow;
                }, 40*1000);
                this.timeout_9 = setTimeout(() => {
                  this.CTD_3 = res.response.targetdifficultyrandomx;
                }, 45*1000);
              }
              resolve();
            }
          },
          error => {}
        );
    });
  }

  incrementseconds(){
    this.latestblockdetail.letest_block_num  = this.latestblockdetail.letest_block_num + 1;
  }

  ngOnDestroy() {
    clearInterval(this.apiInterval);
    clearTimeout(this.timeout_1);
    clearTimeout(this.timeout_2);
    clearTimeout(this.timeout_3);
    clearTimeout(this.timeout_4);
    clearTimeout(this.timeout_5);
    clearTimeout(this.timeout_6);
    clearTimeout(this.timeout_7);
    clearTimeout(this.timeout_8);
    clearTimeout(this.timeout_9);

    this.latestblockdetailObservable
      ? this.latestblockdetailObservable.unsubscribe()
      : null;
  }
}
