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
  Block_size;
  timeout_1;
  timeout_2;
  timeout_3;
  timeout_4;
  timeout_5;
  timeout_6;
  timeout_7;
  timeout_8;
  timeout_9;
  timeout_10;
  halvingtext;
  havlingTimer;
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
              //console.log(parseFloat(this.epicData.lastPrice).toFixed(3));
              this.epicData.lastPrice = parseFloat(this.epicData.lastPrice).toFixed(3);
              resolve();
            }
          },
          error => {}
        );
    });
  }
  timercountdown(daysLeft: number): void {
    // Calculate the target date based on the number of days left
    let days = Math.floor(daysLeft);
    let hoursDecimal = (daysLeft - days) * 24;
    let hours = Math.floor(hoursDecimal);
    let minutesDecimal = (hoursDecimal - hours) * 60;
    let minutes = Math.floor(minutesDecimal);
    let secondsDecimal = (minutesDecimal - minutes) * 60;
    let seconds = Math.floor(secondsDecimal);
    let targetDate = new Date();
    // console.log(days ,hours , minutes, seconds );
    targetDate.setDate(targetDate.getDate() + days);
    targetDate.setHours(targetDate.getHours() + hours);
    targetDate.setMinutes(targetDate.getMinutes() + minutes);
    targetDate.setSeconds(targetDate.getSeconds() + seconds);
    let countDownDate = targetDate.getTime();
    // Update the countdown every 1 second
    this.havlingTimer = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      let text = "";
      if(days == 1){
        text = "1 day ";
      }else if (days > 1){
        text = days+" days ";
      }
      if(hours == 1){
        text = text + "1 hour ";
      }else if (hours > 1){
        text = text + hours+" hours ";
      }
      if(minutes == 1){
        text = text + "1 minute ";
      }else if (minutes > 1){
        text = text + minutes+" minutes ";
      }
      this.halvingtext = text;
    }, 5 * 1000);
  }
  public parseDays (value) { 
    let year, months, week, days;
    let text = "";
    year = value >= 365 ? Math.floor(value / 365) : 0;
    value = year ? value - (year*365) : value;
    months = value >= 30 ? Math.floor((value % 365) / 30) : 0;
    value = months ? value - (months*30) : value;
    week = value >= 7 ? Math.floor((value % 365) / 7) : 0;
    value = week ? value - (week*7) : value;
    days = value < 7 ? Math.floor((value % 365) % 7) : 0;
    if(year == 1){
      text = "1 year ";
    }else if (year > 1){
      text = year+" years ";
    }
    if(months == 1){
      text = text + "1 month ";
    }else if (months > 1){
      text = text + months+" months ";
    }
    if(week == 1){
      text = text + "1 week ";
    }else if (week > 1){
      text = text + week+" weeks ";
    }
    if(days == 1){
      text = text + "1 day ";
    }else if (days > 1){
      text = text + days+" days ";
    }
    return text;
    // console.log("years = ", year); 
    // console.log("months = ",months); 
    // console.log("weeks = ",week); 
    // console.log("days = ", days);
    // console.log(text);
  }

  public gettingprevioushashList() {
    return new Promise<void>((resolve, reject) => {
      this.chartService
        .apiGetRequest("", "/blockchain_block/previousblockdetails")
        .subscribe(
          res => {
            if (res["status"] == 200) {
              // halving calculation
              let timestamp = Math.floor(new Date().getTime() / 1000);
              let blockReward = 4;
              let currentCoin = res.response.coin_existence;
              let endSupply = 16571520;

              if(timestamp < 1685816999){
                blockReward = 4;
                endSupply = 16571520;
              }else if(timestamp >= 1685816999){
                blockReward = 2;
                endSupply = 18875520;
              }else if(timestamp >= 1754850599){
                blockReward = 1;
                endSupply = 20342880;
              }else if(timestamp >= 1842805799){
                blockReward = 0.15625;
                endSupply = 20671380;
              }else if(timestamp >= 1968863399){
                blockReward = 0.078125;
                endSupply = 20835630;
              }

              let remainingBlock = endSupply - currentCoin;
              let remainingBlockPerDay = (60*24) * blockReward;
              let daysLeft = remainingBlock/remainingBlockPerDay;
              console.log(endSupply,currentCoin);
              console.log(daysLeft);
              this.halvingtext = this.timercountdown(daysLeft);
              // console.log(this.halvingtext);

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
                let blockSize = (res.response.diskSpaceKb).replace(/G/g, '');
                this.Block_size = blockSize;
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
                let blockSize = (res.response.diskSpaceKb).replace(/G/g, '');
                this.Block_size = blockSize;
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
                this.timeout_10 = setTimeout(() => {
                  let blockSize = (res.response.diskSpaceKb).replace(/G/g, '');
                  this.Block_size = blockSize;
                }, 50*1000);
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
    clearInterval(this.havlingTimer);
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
