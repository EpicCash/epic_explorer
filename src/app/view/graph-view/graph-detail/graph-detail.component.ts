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
  public selectedItem12: Number = 1;
  public Type: any = '';
  public selectedTarget: Number = 3;
  public selectedTarget12: Number = 1;
  
  public GraphtInput: any;
  public GraphtOutput: any;
  public GraphtKernal: any;
  public GraphtDate: any;
  public GraphtHour: any;
  public linearTotalGraphData: any = [];
  public TdifficultyRange: any = '1 day';

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
      case 'difficulty':
        this.totalDifficultyreq();
          this.comp.Difficultyreq().then(res => {
            this.hashdata = this.comp.linearGraphData;
            this.hashdata.layout.height = 500;
            this.title = 'Total Difficulty';
            this.selectedItem = 6;
            this.selectedTarget = 6;
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
            //console.log(this.hashdata);
          });
          break;
      case 'transactions-by-time':
          this.comp.Transactionheatmapreq().then(res => {
            this.hashdata = this.comp.heatMapGrowthData;
            this.hashdata.layout.height = 500;
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
            this.hashdata.layout.height = 500;
            this.title = 'Blocks';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'transaction-fees':
          this.comp.Transcationreq().then(res => {
            this.hashdata = this.comp.transcationGraphData;
            //console.log(this.hashdata);
            this.hashdata.layout.height = 500;
            this.title = 'Transaction Fees';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'supply-growth':
          this.comp.Growthreq().then(res => {
            this.hashdata = this.comp.growthGraphData;
            this.hashdata.layout.height = 500;
            this.title = 'Supply Growth';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'blocks-mined':
          this.comp.Blockminedreq().then(res => {
            this.hashdata = this.comp.doubleareaGraphData;
            this.hashdata.layout.height = 500;
            this.title = 'Blocks Mined';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'hashrate-growth-chart':
          this.comp.Transactiondoublelinechartreq().then(res => {
            this.hashdata = this.comp.blockGraphData;
            this.hashdata.layout.height = 500;
            // this.hashdata.layout.width =
            //   window.innerWidth - window.innerWidth / 2.8;
            this.title = 'HashRate Growth Chart';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'block-interval':
          this.comp.Blockspersecreq().then(res => {
            this.hashdata = this.comp.areaGraphData;
            this.hashdata.layout.height = 500;
            // this.hashdata.layout.width =
            //   window.innerWidth - window.innerWidth / 2.8;
            this.title = 'Block Interval';
            this.titleService.setTitle(
              this.route.snapshot.data.title + ' - ' + this.title,
            );
          });
          break;
        case 'stackchart':
        this.comp.stackchartreq().then(res => {
          this.hashdata = this.comp.stackGraphData;
          this.hashdata.layout.height = 500;
          this.title = 'Stackbar Chart';
          this.titleService.setTitle(
            this.route.snapshot.data.title + ' - ' + this.title,
          );
        });
        break;
        case 'piechart':
        this.comp.piechartreq().then(res => {
          this.hashdata = this.comp.pieGraphData;
          this.hashdata.layout.height = 500;
          this.title = 'Pie Chart';
          this.titleService.setTitle(
            this.route.snapshot.data.title + ' - ' + this.title,
          );
        });
        break;
        case 'transactions-vs-date':
          this.comp.Transactionlinechartreq().then(res => {
            this.hashdata = this.comp.feeGraphData;
            this.hashdata.layout.height = 500;
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
    this.comp.Type = p4 != '' ? p4 : this.comp.Type == '' ? 'cuckatoo' : this.comp.Type;

    switch (this.chartType) {
      case 'difficulty':
        this.comp.Difficultyreq(p1, p2, p3, p4).then(res => {
          this.hashdata = this.comp.linearGraphData;
          this.hashdata.layout.height = 500;
          this.title = 'Total Difficulty';
        });
        break;
      case 'transactions-by-time':
        this.comp.transactionheatmapFunc(p1, p2, p3, p4).then(res => {
          this.hashdata = this.comp.heatMapGrowthData;
          // console.log(this.hashdata);
          this.hashdata.layout.height = 500;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Transactions over time';
        });
        break;
      case 'blocks':
        this.comp.Difficultyreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.barGraphData;
          this.hashdata.layout.height = 500;
          this.title = 'Blocks';
        });
        break;
      case 'blocks-mined':
        this.comp.Blockminedreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.doubleareaGraphData;
          this.hashdata.layout.height = 500;
          this.title = 'Blocks Mined';
        });
        break;
      case 'transaction-fees':
        this.comp.Transcationreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.transcationGraphData;
          this.hashdata.layout.height = 500;
          this.title = 'Transaction Fees';
        });
        break;
      case 'supply-growth':
        this.comp.Growthreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.growthGraphData;
          this.hashdata.layout.height = 500;
          this.title = 'Supply Growth';
        });
        break;
      case 'hashrate-growth-chart':
        this.comp.Transactiondoublelinechartreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.blockGraphData;
          this.hashdata.layout.height = 500;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'HashRate Growth Chart';
        });
        break;
      case 'block-interval':
        this.comp.Blockspersecreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.areaGraphData;
          this.hashdata.layout.height = 500;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Block Interval';
        });
        break;
      case 'stackchart':
        this.comp.stackchartreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.stackGraphData;
          this.hashdata.layout.height = 500;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Stackbar Chart';
        });
        break;
      case 'piechart':
        this.comp.piechartreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.pieGraphData;
          this.hashdata.layout.height = 500;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Pie Chart';
        });
        break;
      case 'transactions-vs-date':
        this.comp.Transactionlinechartreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.feeGraphData;
          this.hashdata.layout.height = 500;
          // this.hashdata.layout.width =
          //   window.innerWidth - window.innerWidth / 2.8;
          this.title = 'Transactions by Date';
        });
        break;
    }
  }

  totalDifficultyreq(
    fromDate = '',
    ToDate = '',
    interval = '',
    type = ''
  ) {
    this.Type = type != '' ? type : this.Type == '' ? 'cuckatoo' : this.Type;
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      params = params.append('Type', this.Type);
      params = params.append('Difftype', 'total');
      this.chartService
        .apiGetRequest(params, '/blockchain_block/totaldiff')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let DifficultychartDate = res.response.Date;
                let TargetDifficulty = res.response.TargetDifficulty;
                
                this.totaldifficultyChartFunc(
                  DifficultychartDate,
                  TargetDifficulty,
                  this.Type
                );
              resolve();
            }
          },
          error => {},
        );
    });
  }

  totaldifficultyChartFunc(DifficultychartDate, TargetDifficulty, Type) {
    this.linearTotalGraphData = {
      data: [
        {
          x: DifficultychartDate,
          y: TargetDifficulty,
          text: TargetDifficulty,
          mode: 'lines+markers',
          type: 'scatter',
          name: '',
          line: { color: '#ac3333' },
          hovertemplate: '%{x}<br> Difficulty : %{text:,}',
        },
      ],
      layout: {
        hovermode: 'closest',
        height: 250,
        autosize: true,
        showlegend: false,
        xaxis: {
          tickangle: -45,
          tickformat: '%m-%d',
        },
        yaxis: {
          title: 'Diff',
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
    };
  }
}
