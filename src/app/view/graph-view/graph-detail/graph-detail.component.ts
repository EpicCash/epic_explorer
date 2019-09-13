import { Component, OnInit, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChartService } from '../../../shared/services/chart.service';
import { ActivatedRoute } from '@angular/router';
import { GraphListComponent } from '../../home/graph-list/graph-list.component';
import { Title } from '@angular/platform-browser';

import { TransServiceService } from '../../../shared/services/trans-service.service';



@Component({
  providers: [GraphListComponent],
  selector: 'app-graph-detail',
  templateUrl: './graph-detail.component.html',
  styleUrls: ['./graph-detail.component.css'],
})
export class GraphDetailComponent implements OnInit {

  TimeArr: any;
  public hashdata: any = [];
  public title: any;
  public chartType : any = [];
  public selectedItem: Number = 3;
  public selectedItem8: Number = 2;
  public selectedItem12: Number = 4;
  public Type: any = '';
  public selectedTarget: Number = 3;
  public selectedTarget12: Number = 1;
  public selectedInteverval: Number = 1;
  public currenyIntervalDate: any;
  public showcurrentIntervalDate: any;
  
  public GraphtInput: any;
  public GraphtOutput: any;
  public GraphtKernal: any;
  public GraphtDate: any;
  public GraphtHour: any;
  public linearTotalGraphData: any = [];

  constructor(
    private route: ActivatedRoute,
    private chartService: ChartService,
    private comp: GraphListComponent,
    private titleService: Title,
    public translate: TransServiceService
  ) {}
  ngOnInit() {

    var self = this;
    var x = setInterval(function() {
      self.TimeArr = self.chartService.GetTimer()
        ? self.chartService.GetTimer()
        : false;
    }, 1000);
    this.route.params.subscribe(params => {
      this.chartType = params['hashid'];
      //console.log(this.chartType);
    switch(this.chartType){
      case 'total-difficulty':
        // this.totalDifficultyreq();
          this.comp.Difficultyreq('total').then(res => {
            this.hashdata = this.comp.linearTotalGraphData;
            console.log('this.comp.linearTotalGraphData',this.comp.linearTotalGraphData);
            this.hashdata.layout.height = 300;
            //this.hashdata.layout.xaxis.domain = [0.1,0.9];
            //this.hashdata.layout.yaxis2.position = 1.25;
            this.title = 'Total Difficulty';
            this.selectedItem = 6;
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
            //console.log(this.hashdata);
          });
          break;
        case 'target-difficulty':
            // this.totalDifficultyreq();
              this.comp.Difficultyreq('target').then(res => {
                this.hashdata = this.comp.linearGraphData;
                console.log('this.comp.linearGraphData',this.comp.linearGraphData);
                this.hashdata.layout.height = 300;
                this.hashdata.layout.xaxis.domain = [0.1,0.9];
                this.hashdata.layout.yaxis2.position = 2.25;
                this.title = 'Target Difficulty';
                this.selectedItem = 6;
                this.titleService.setTitle(
                  this.route.snapshot.data.title + ' - ' + this.title,
                );
                //console.log(this.hashdata);
              });
              break;
        
      case 'transactions-over-time':
          this.comp.Transactionheatmapreq().then(res => {
            this.hashdata = this.comp.heatMapGrowthData;
            this.hashdata.layout.height = 300;
            // this.hashdata.layout.width =
            //   window.innerWidth - (window.innerWidth / 2.8);
            this.title = 'Transactions over time';
            this.GraphtDate = this.comp.tDate;
            this.GraphtHour = this.comp.tHour;
            this.GraphtInput = this.comp.tInput;
            this.GraphtOutput = this.comp.tOutput;
            this.GraphtKernal = this.comp.tKernal;
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
            console.log(
              window.innerWidth,
              window.innerWidth - window.innerWidth / 8,
            );
          });
          break;
        case 'blocks':
          this.comp.blockreq().then(res => {
            this.hashdata = this.comp.barGraphData;
            this.hashdata.layout.height = 300;
            this.title = 'Blocks';
            this.selectedItem = 6;
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
          case 'block-interval':
            this.comp.Blockintervalreq().then(res => {
              this.hashdata = this.comp.barGraphIntevalData;
              this.currenyIntervalDate = this.comp.currenyIntervalDate;
              this.showcurrentIntervalDate =this.comp.showcurrentIntervalDate;
              this.hashdata.layout.height = 300;
              this.title = 'Block Interval';
              this.selectedInteverval = 1;
              this.titleService.setTitle(
                this.route.snapshot.data.title + ' - ' + this.title,
              );
            });
            break;  
        case 'transaction-fees':
          this.comp.Transcationreq().then(res => {
            this.hashdata = this.comp.transcationGraphData;
            //console.log(this.hashdata);
            this.hashdata.layout.height = 300;
            this.title = 'Transaction Fees';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'supply-growth':
          this.comp.Growthreq().then(res => {
            this.hashdata = this.comp.growthGraphData;
            this.hashdata.layout.height = 300;
            this.title = 'Supply Growth';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'blocks-mined':
          this.comp.Blockminedreq().then(res => {
            this.hashdata = this.comp.doubleareaGraphData;
            this.hashdata.layout.height = 300;
            this.title = 'Blocks Mined';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'hashrate-growth-chart':
          // this.comp.Transactiondoublelinechartreq().then(res => {
          //   this.hashdata = this.comp.blockGraphData;
          //   this.hashdata.layout.height = 300;
          //   // this.hashdata.layout.width =
          //   //   window.innerWidth - window.innerWidth / 2.8;
          //   this.title = 'HashRate Growth Chart';
          //   this.titleService.setTitle(
          //     this.route.snapshot.data.title + ' - ' + this.title,
          //   );
          // });
          break;
        case 'avg-block-interval':
          this.comp.Blockspersecreq().then(res => {
            this.hashdata = this.comp.areaGraphData;
            this.hashdata.layout.height = 300;
            // this.hashdata.layout.width =
            //   window.innerWidth - window.innerWidth / 2.8;
            this.title = 'Avg Block Interval';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'blocks-by-algorithm':
        this.comp.stackchartreq().then(res => {
          this.hashdata = this.comp.stackGraphData;
          this.hashdata.layout.height = 300;
          this.title = 'Blocks by Algorithm';
          this.titleService.setTitle(
            this.route.snapshot.data.title + ' - ' + this.title,
          );
        });
        break;
        case 'piechart':
        this.comp.piechartreq().then(res => {
          this.hashdata = this.comp.pieGraphData;
          this.hashdata.layout.height = 300;
          this.title = 'Pie Chart';
          this.titleService.setTitle(
            this.route.snapshot.data.title + ' - ' + this.title,
          );
        });
        break;
        case 'transactions-by-date':
          this.comp.Transactionlinechartreq().then(res => {
            this.hashdata = this.comp.feeGraphData;
            this.hashdata.layout.height = 300;
            // this.hashdata.layout.width =
            //   window.innerWidth - window.innerWidth / 2.8;
            //console.log(this.hashdata.layout.width);
            this.title = 'Transactions by Date';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
      }
	});
  }
  public ChartFromView(
    p1,
    p2,
    p3,
    p4,
    p5
  ) {
    // (p1, p2, p3, p4, p5) for (fromDate, ToDate, interval, fordifficult, forblocks) for difficult and nar chart
    // AND For heatmap and others - It will change
    this.comp.Type = p4 != '' && (p4 == 'cuckatoo' || p4 == 'progpow' || p4 == 'randomx') ? p4 : this.comp.Type == '' ? 'cuckatoo' : this.comp.Type;

    switch (this.chartType) {
      case 'target-difficulty':
        this.comp.Difficultyreq('target',p1, p2, p3, p4).then(res => {
          this.hashdata = this.comp.linearGraphData;
          this.hashdata.layout.height = 300;
          this.hashdata.layout.xaxis.domain = [0.1,0.9];
          this.hashdata.layout.yaxis2.position = 2.25;
          this.title = 'Target Difficulty';
        });
        break;
        case 'total-difficulty':
        this.comp.Difficultyreq('total',p1, p2, p3, p4).then(res => {
          this.hashdata = this.comp.linearTotalGraphData;
          // this.hashdata.layout.height = 300;
          // this.hashdata.layout.xaxis.domain = [0.1,0.9];
          // this.hashdata.layout.yaxis.automargin= true;
          // this.hashdata.layout.yaxis1.automargin= true;
          // this.hashdata.layout.yaxis2.automargin= true;
          // this.hashdata.layout.yaxis2.position = 2.25;
          this.title = 'Total Difficulty';
        });
        break;
      case 'transactions-over-time':
        this.comp.transactionheatmapFunc(p1, p2, p3, p4).then(res => {
          this.hashdata = this.comp.heatMapGrowthData;
          // console.log(this.hashdata);
          this.hashdata.layout.height = 300;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Transactions over time';
        });
        break;
      case 'blocks':
        this.comp.blockreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.barGraphData;
          this.hashdata.layout.height = 300;
          this.title = 'Blocks';
        });
        break;
      case 'block-interval':
      this.comp.Blockintervalreq(p1).then(res => {
        this.hashdata = this.comp.barGraphIntevalData;
        this.currenyIntervalDate = this.comp.currenyIntervalDate;
        this.showcurrentIntervalDate =this.comp.showcurrentIntervalDate;
        this.hashdata.layout.height = 300;
        this.title = 'Block Interval';
      });
      break;  
      case 'blocks-mined':
        this.comp.Blockminedreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.doubleareaGraphData;
          this.hashdata.layout.height = 300;
          this.title = 'Blocks Mined';
        });
        break;
      case 'transaction-fees':
        this.comp.Transcationreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.transcationGraphData;
          this.hashdata.layout.height = 300;
          this.title = 'Transaction Fees';
        });
        break;
      case 'supply-growth':
        this.comp.Growthreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.growthGraphData;
          this.hashdata.layout.height = 300;
          this.title = 'Supply Growth';
        });
        break;
      case 'hashrate-growth-chart':
        // this.comp.Transactiondoublelinechartreq(p1, p2, p3).then(res => {
        //   this.hashdata = this.comp.blockGraphData;
        //   this.hashdata.layout.height = 300;
        //   // this.hashdata.layout.width =
        //   //   window.innerWidth - window.innerWidth / 2.8;
        //   this.title = 'HashRate Growth Chart';
        // });
        break;
      case 'avg-block-interval':
        this.comp.Blockspersecreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.areaGraphData;
          this.hashdata.layout.height = 300;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Avg Block Interval';
        });
        break;
      case 'blocks-by-algorithm':
        this.comp.stackchartreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.stackGraphData;
          this.hashdata.layout.height = 300;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Stackbar Chart';
        });
        break;
      case 'piechart':
        this.comp.piechartreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.pieGraphData;
          this.hashdata.layout.height = 300;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Pie Chart';
        });
        break;
      case 'transactions-by-date':
        this.comp.Transactionlinechartreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.feeGraphData;
          this.hashdata.layout.height = 300;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Transactions by Date';
        });
        break;
    }
  }

  

  // totaldifficultyChartFunc(DifficultychartDate, TargetDifficulty, Type, range) {
  //   this.linearTotalGraphData = {
  //     data: [
  //       {
  //         x: DifficultychartDate,
  //         y: TargetDifficulty,
  //         text: TargetDifficulty,
  //         mode: 'lines+markers',
  //         type: 'scatter',
  //         name: '',
  //         line: { color: '#ac3333' },
  //         hovertemplate: '%{x}<br> Difficulty : %{text:,}',
  //       },
  //     ],
  //     layout: {
  //       hovermode: 'closest',
  //       height: 300,
  //       autosize: true,
  //       showlegend: false,
  //       xaxis: {
  //         tickangle: -45,
  //         tickformat: '%m-%d',
  //         fixedrange: true,
  //         showgrid: true
  //       },
  //       yaxis: {
  //         title: 'Diff',
  //         fixedrange: true,
  //         showgrid: true,
  //         range: range
  //       },
  //       margin: {
  //         l: 50,
  //         r: 50,
  //         b: 50,
  //         t: 50,
  //       },
  //     },
  //   };
  // }
}
