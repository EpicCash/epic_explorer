import { Component, OnInit, Input } from '@angular/core';
import { ChartService } from '../../../shared/services/chart.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransServiceService } from '../../../shared/services/trans-service.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'epic-explorer-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.css'],
})
export class GraphListComponent implements OnInit {
  @Input()
  viewchart: boolean = true;
  public linearGraphData: any = [];
  public areaGraphData: any = [];
  public doubleareaGraphData: any = [];
  public barGraphData: any = [];
  public barGraphIntevalData: any = [];
  public blockGraphData: any = [];
  public bubbleGraphdData: any = [];
  public feeGraphData: any = [];
  public growthGraphData: any = [];
  public heatMapGrowthData: any = [];
  public transcationGraphData: any = [];
  public stackGraphData: any = [];
  public pieGraphData: any = [];
  public linearTotalGraphData: any = [];
  public currenyIntervalDate: any;
  public showcurrentIntervalDate: any;

  public lg_last: any;
  public ag_last: any = '';
  public dg_last: any = '';
  public brg_last: any = '';
  public bg_last: any = '';
  public bubg_last: any = '';
  public fg_last: any = '';
  public gg_last: any = '';
  public tg_last: any = '';
  public hg_last: any = '';
  public sg_last: any = '';
  public pg_last: any = '';
  public blockinteval_last: any = '';

  public selectedItem: Number = 6;
  public selectedItem3: Number = 1;
  public selectedItem2: Number = 3;
  public selectedItem4: Number = 3;
  public selectedItem5: Number = 3;
  public selectedItem7: Number = 3;
  public selectedItem8: Number = 3;
  public selectedItem81: Number = 2;
  public selectedItem9: Number = 3;
  public selectedItem10: Number = 3;
  public selectedItem11: Number = 3;
  public selectedItem12: Number = 4;
  public selectedTarget: Number = 6;
  public selectedTarget12: Number = 4;
  public selectedInteverval: Number = 1;

  public tInput: any;
  public tOutput: any;
  public tKernal: any;
  public tDate: any;
  public tHour: any;
  public Type: any = 'all';
  public difficultyRange: any = '1 day';
  public TdifficultyRange: any = '1 day';

  viewchartvar: boolean;

  constructor(private chartService: ChartService, private http: HttpClient, public translate: TransServiceService, private router: Router,
  ) {
    if (this.router.url == '/all') {
      this.viewchartvar = true;
    } else {
      this.viewchartvar = false;
    }
  }

  ngOnInit() {
    /* Total Difficulty and blocks chart fetching */
    this.Difficultyreq('target');
    this.Difficultyreq('total');
    this.blockreq();

    this.Blockintervalreq();

    /* Transcation fee chart fetching */
    this.Transcationreq();

    /* Growth chart fetching */
    this.Growthreq();

    /* Blockspersec chart fetching */
    this.Blockspersecreq();

    /* Blockmined chart fetching */
    this.Blockminedreq();

    /* Transactionheatmap chart fetching */
    this.Transactionheatmapreq();

    /* Transactionline chart fetching */
    this.Transactionlinechartreq();

    /* Transaction2line chart fetching */
    // this.Transactiondoublelinechartreq();

    /* Stack chart fetching */
    this.stackchartreq();

    /* Pie chart fetching */
    this.piechartreq();

  }

  piechartreq(
    fromDate = '',
    ToDate = '',
    interval = '',
  ) {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/blockpiechart')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let plabel = res.response.label;
              let pvalues = res.response.value;
              this.pg_last =
                pvalues[pvalues.length - 1];
              this.piechartFunc(
                plabel,
                pvalues,
              );
              resolve();
            }
          },
          error => { },
        );
    });
  }

  stackchartreq(
    fromDate = '',
    ToDate = '',
    interval = '',
  ) {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/stackblock')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let sDate = res.response.Date;
              let Cuckoo = res.response.Cuckoo;
              let ProgPow = res.response.ProgPow;
              let RandomX = res.response.RandomX;
              this.sg_last =
                RandomX[RandomX.length - 1];
              this.stackchartFunc(
                sDate,
                Cuckoo,
                ProgPow,
                RandomX
              );
              resolve();
            }
          },
          error => { },
        );
    });
  }

  Transactiondoublelinechartreq(fromDate = '', ToDate = '', interval = '') {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      // this.chartService
      //   .apiGetRequest(params, '/blockchain_block/hashrate')
      //   .subscribe(
      //     res => {
      //       if (res['status'] == 200) {
      //         let Hdate = res.response.date;
      //         let H29 = res.response.hashrate29;
      //         let H31 = res.response.hashrate31;
      //         this.hg_last = H31[H31.length - 1];
      //         this.transactiondoublelinechartFunc(Hdate, H29, H31);
      //         resolve();
      //       }
      //     },
      //     error => {},
      //   );
    });
  }

  Transactionlinechartreq(fromDate = '', ToDate = '', interval = '') {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_kernel/transactionlinechart')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let Tdate = res.response.date;
              let Ttotalinput = res.response.totalinput;
              let Ttotalkernal = res.response.totalkernal;
              let Ttotaloutput = res.response.totaloutput;
              this.tg_last = Ttotaloutput[Ttotaloutput.length - 1];
              this.transactionlinechartFunc(
                Tdate,
                Ttotalinput,
                Ttotalkernal,
                Ttotaloutput,
              );
              resolve();
            }
          },
          error => { },
        );
    });
  }

  Transactionheatmapreq() {
    return new Promise((resolve, reject) => {
      this.chartService
        .apiGetRequest('', '/blockchain_kernel/transactionheatmap')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              this.tDate = res.response.date;
              this.tHour = res.response.hour[0];
              this.tInput = res.response.totalinput;
              this.tOutput = res.response.totaloutput;
              this.tKernal = res.response.totalkernal;
              // let transtypepassed =
              //   transtype == 'input'
              //     ? tInput
              //     : transtype == 'output'
              //     ? tOutput
              //     : transtype == 'kernal'
              //     ? tKernal
              //     : tInput;
              // let transpassed =
              //   transtype == 'input'
              //     ? 'Input'
              //     : transtype == 'output'
              //     ? 'Output'
              //     : transtype == 'kernal'
              //     ? 'Kernel'
              //     : 'Input';
              this.transactionheatmapFunc(
                this.tDate,
                this.tHour,
                this.tKernal,
                'Kernal',
              );
              resolve();
            }
          },
          error => { },
        );
    });
  }

  Blockminedreq(fromDate = '', ToDate = '', interval = '') {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/blockminedchart')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let mDate = res.response.date;
              let ProgPow = res.response.ProgPow;
              let Cuckoo = res.response.Cuckoo;
              let RandomX = res.response.RandomX;

              let ProgPowper = res.response.ProgPowper;
              let Cuckooper = res.response.Cuckooper;
              let RandomXper = res.response.RandomXper;

              this.dg_last = RandomXper[RandomXper.length - 1];
              this.blockminedFunc(
                mDate,
                ProgPow,
                Cuckoo,
                RandomX,
                ProgPowper,
                Cuckooper,
                RandomXper,
              );
              resolve();
            }
          },
          error => { },
        );
    });
  }

  Blockspersecreq(fromDate = '', ToDate = '', interval = '') {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/blockspersec')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let bDate = res.response.date;
              let bPeriod = res.response.period;
              this.ag_last = bPeriod[bPeriod.length - 1];
              this.blockspersecFunc(bDate, bPeriod);
              resolve();
            }
          },
          error => { },
        );
    });
  }

  Growthreq(fromDate = '', ToDate = '', interval = '') {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/supplygrowth')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let gDate = res.response.date;
              let gReward = res.response.total_reward_per_day;
              let gaddedreward = res.response.addedreward;
              this.gg_last = gReward[gReward.length - 1];
              this.growthFunc(gDate, gReward, gaddedreward);
              resolve();
            }
          },
          error => { },
        );
    });
  }

  Transcationreq(fromDate = '', ToDate = '', interval = '') {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_kernel/transactionfee')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let TfDate = res.response.Date;
              let TfFee = res.response.Fee;
              this.fg_last = TfFee[TfFee.length - 1];
              this.transcationfeeFunc(TfDate, TfFee);
              resolve();
            }
          },
          error => { },
        );
    });
  }

  Difficultyreq(
    difftype = '',
    fromDate = '',
    ToDate = '',
    interval = '',
    type = ''
  ) {
    this.Type = type != '' ? type : this.Type == '' ? 'all' : this.Type;
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      params = params.append('Type', this.Type);
      params = params.append('Difftype', difftype);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/totaldiff')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let DifficultychartDate = res.response.Date;
              let DifficultyCuckatoo = res.response.DifficultyCuckatoo;
              let DifficultyRandomx = res.response.DifficultyRandomx;
              let DifficultyProgpow = res.response.DifficultyProgpow;
              let data;
              switch (this.Type) {
                case 'all':
                  data =
                    [
                      {
                        x: DifficultychartDate,
                        y: DifficultyCuckatoo,
                        text: DifficultychartDate,
                        // mode: 'lines+markers',
                        type: 'scatter',
                        name: 'Cuckoo',
                        // line: { color: '#ac3333' },
                        //hovertemplate: '%{text}<br> Cuckoo : %{y:,}',
                        hovertemplate: 'Cuckoo : %{y:,}',
                        hoverlabel: {namelength : 0}

                      },
                      {
                        x: DifficultychartDate,
                        y: DifficultyProgpow,
                        text: DifficultychartDate,
                        // mode: 'lines+markers',
                        type: 'scatter',
                        name: 'Progpow',
                        yaxis: 'y2',
                        // line: { color: '#ac3333' },
                        hovertemplate: 'Progpow : %{y:,}',
                        hoverlabel: {namelength : 0}
                      },
                      {
                        x: DifficultychartDate,
                        y: DifficultyRandomx,
                        text: DifficultychartDate,
                        // mode: 'lines+markers',
                        type: 'scatter',
                        name: 'RandomX',
                        yaxis: 'y3',
                        // line: { color: '#ac3333' },
                        hovertemplate: 'RandomX : %{y:,}',
                        hoverlabel: {namelength : 0}
                      },
                    ];
                  break;
                default:
                  let yvalue = this.Type == 'cuckatoo' ? DifficultyCuckatoo : this.Type == 'progpow' ? DifficultyProgpow : this.Type == 'randomx' ? DifficultyRandomx : []
                  data =
                    [
                      {
                        x: DifficultychartDate,
                        y: yvalue,
                        text: DifficultychartDate,
                        mode: 'lines+markers',
                        type: 'scatter',
                        name: '',
                        line: { color: '#ac3333' },
                        hovertemplate: '%{text}<br> Difficulty : %{y:,}',
                      }];
                  break;
              }
              // res.response.Minrange, res.response.Maxrange
              let range = [];
              let tickformat = res.response.tickFormat;
              // this.lg_last =
              // TargetDifficulty[TargetDifficulty.length - 1];

              switch (difftype) {
                case 'total':
                  this.totaldifficultyChartFunc(
                    DifficultychartDate,
                    data,
                    this.Type,
                    range,
                    tickformat
                  );
                  break;
                case 'target':
                  this.difficultyChartFunc(
                    DifficultychartDate,
                    data,
                    this.Type,
                    range,
                    tickformat
                  );
                  break;
              }
              resolve();
            }
          },
          error => { },
        );
    });
  }

  Blockintervalreq(interval = ''){
    //interval = '2019-08-11';
    if(interval == "today"){
      this.currenyIntervalDate = moment(new Date()).format('YYYY-MM-DD');
      this.showcurrentIntervalDate = moment(new Date()).format('MM-DD-YYYY');
    }else if(interval == "yesterday"){
      this.currenyIntervalDate = moment(new Date()).subtract(1, "days").format("YYYY-MM-DD");
      this.showcurrentIntervalDate = moment(new Date()).subtract(1, "days").format("MM-DD-YYYY");
    }else if(interval == "previous"){
      var currentdate = this.currenyIntervalDate;
      this.currenyIntervalDate = moment(currentdate).subtract(1, "days").format("YYYY-MM-DD");
      this.showcurrentIntervalDate = moment(currentdate).subtract(1, "days").format("MM-DD-YYYY");
    }else if(interval == "next"){
      var currentdate = this.currenyIntervalDate;
      this.currenyIntervalDate = moment(currentdate).add(1, "days").format("YYYY-MM-DD");
      this.showcurrentIntervalDate = moment(currentdate).add(1, "days").format("MM-DD-YYYY");
    }else{
      this.currenyIntervalDate = moment(new Date()).format('YYYY-MM-DD');
      this.showcurrentIntervalDate = moment(new Date()).format('MM-DD-YYYY');
    }
    // console.log(this.currenyIntervalDate);
    // console.log(this.showcurrentIntervalDate);
    interval = this.currenyIntervalDate;
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/blockinterval')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let BlocksChartHeight = res.response.height;
              let Blockval = res.response.alter;
              this.blockinteval_last = Blockval[Blockval.length - 1];
              this.BlocksIntevalFunc(BlocksChartHeight, Blockval);
              resolve();
            }
          },
          error => { },
        );
    });
  }

  blockreq(
    fromDate = '',
    ToDate = '',
    interval = '',
  ) {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/blockcount')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let DifficultychartDate = res.response.Date;
              let BlocksChartDate = res.response.blockDate;
              let Blockval = res.response.Blocks;
              this.brg_last = Blockval[Blockval.length - 1];
              this.totalBlocksFunc(BlocksChartDate, Blockval);
              resolve();
            }
          },
          error => { },
        );
    });
  }

  difficultyChartFunc(DifficultychartDate, data, Type, range, tickformat) {
    // console.log('range rangerangerange',range);
    this.linearGraphData = {
      data: data,
      layout: {
        // hovermode: 'closest',
        height: 250,
        autosize: true,
        showlegend: true,
        legend: {"orientation": "h",
               x: 0.1, y: -0.5,font :{ 'size': 10}},
        xaxis: {
          tickangle: -45,
          tickformat: tickformat,
          fixedrange: true,
          rangemode: 'nonnegative',
          domain: [0.2, 0.8]
          // showgrid: true
        },
        yaxis: {
          title: 'Cuckoo',
          fixedrange: true,
          rangemode: 'nonnegative'
          // showgrid: true,
          // range: range
        },
        yaxis2: {
          title: 'Progpow',
          fixedrange: true,
          // showgrid: true,
          // range: range,
          overlaying: 'y',
          rangemode: 'nonnegative',
          side: 'left',
          position: 1.25
        },
        yaxis3: {
          title: 'RandomX',
          fixedrange: true,
          // showgrid: true,
          // range: range,
          anchor: 'x',
          overlaying: 'y',
          rangemode: 'nonnegative',
          side: 'right'

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

  stackchartFunc(sDate, Cuckoo, ProgPow, RandomX) {
    this.stackGraphData = {
      data: [
        {
          x: sDate,
          y: Cuckoo,
          name: 'Cuckoo',
          type: 'bar',
          text: Cuckoo,
          hovertemplate: '%{x}<br> Cuckoo : %{text:,}',
          hoverlabel: {namelength : 0},
          marker: {
            color: '#77817C',
          },
        },
        // {
        //   x: sDate,
        //   y: Cuckatoo,
        //   name: '',
        //   type: 'bar',
        //   text: Cuckatoo,
        //   hovertemplate: '%{x}<br> Cuckaroo : %{text:,}',
        //   marker: {
        //     color: '#54CFDC',
        //   },
        // },
        {
          x: sDate,
          y: ProgPow,
          name: 'Progpow',
          type: 'bar',
          text: ProgPow,
          hovertemplate: '%{x}<br> ProgPow : %{text:,}',
          hoverlabel: {namelength : 0},
          marker: {
            color: '#825f5f',
          },
        },
        {
          x: sDate,
          y: RandomX,
          name: 'Randomx',
          type: 'bar',
          text: RandomX,
          hovertemplate: '%{x}<br> RandomX : %{text:,}',
          hoverlabel: {namelength : 0},
          marker: {
            color: '#a9df5f',
          },
        }

      ],
      layout: {
        hovermode: 'closest',
        //width: 350,
        height: 250,
        autosize: true,
        showlegend: true,
        legend: {"orientation": "h",
        x: 0.35, y: -0.5,font :{ 'size': 10}},
        barmode: 'relative',
        xaxis: {
          showgrid: true,
          zeroline: false,
          tickangle: -45,
          tickformat: '%m-%d',
          rangemode: 'nonnegative',
          fixedrange: true,
        },
        yaxis: {
          showline: false,
          title: 'Blocks',
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
      options: null,
    };
  }


  piechartFunc(plabel, pvalues) {
    this.pieGraphData = {
      data: [
        {
          values: pvalues,
          labels: plabel,
          type: 'pie'
        }

      ],
      layout: {
        hovermode: 'closest',
        //width: 350,
        height: 250,
        autosize: false,
        showlegend: false,
        xaxis: {
          tickangle: -45,
          tickformat: '%m-%d',
          showgrid: true,
          rangemode: 'nonnegative',
          fixedrange: true
        },
        yaxis: {
          title: 'Blocks',
          showgrid: true,
          fixedrange: true,
          rangemode: 'nonnegative'
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
      options: null,
    };
  }

  BlocksIntevalFunc(BlocksChartHeight, Blockval) {
    this.barGraphIntevalData = {
      data: [
        {
          x: BlocksChartHeight,
          y: Blockval,
          text: Blockval,
          name: '',
          hovertemplate: 'Blocks : %{x}<br> Inteval : %{text:,}',
          type: 'bar',
          marker: {
            color: Blockval,
            colorscale: 'Viridis',
          },
        },
      ],
      layout: {
        hovermode: 'closest',
        height: 250,
        autosize: true,
        showlegend: false,
        xaxis: {
          tickangle: -45,
          showgrid: true,
          title: 'Blocks Height',
          rangemode: 'nonnegative',
          fixedrange: true
        },
        yaxis: {
          title: 'Seonds',
          showgrid: true,
          fixedrange: true,
          rangemode: 'nonnegative'
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
      options: null,
    };
  }


  totalBlocksFunc(DifficultychartDate, Blockval) {
    this.barGraphData = {
      data: [
        {
          x: DifficultychartDate,
          y: Blockval,
          text: Blockval,
          name: '',
          hovertemplate: '%{x}<br> Block : %{text:,}',
          type: 'bar',
          marker: {
            color: Blockval,
            colorscale: 'Viridis',
          },
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
          showgrid: true,
          fixedrange: true,
          rangemode: 'nonnegative'
        },
        yaxis: {
          title: 'Blocks',
          rangemode: 'nonnegative',
          showgrid: true,
          fixedrange: true
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
      options: null,
    };
  }

  transcationfeeFunc(TfDate, TfFee) {
    this.transcationGraphData = {
      data: [
        {
          x: TfDate,
          y: TfFee,
          text: TfFee,
          name: '',
          hovertemplate: '%{x}<br> Fee : %{text:,}',
          type: 'lines',
        },
      ],
      layout: {
        hovermode: 'closest',
        height: 250,
        autosize: true,
        xaxis: {
          tickangle: -45,
          tickformat: '%m-%d',
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true,
        },
        yaxis: {
          title: 'Tx Fee',
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true,
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
      options: null,
    };
  }

  growthFunc(gDate, gReward, gaddedreward) {
    this.growthGraphData = {
      data: [
        {
          x: gDate,
          y: gaddedreward,
          type: 'scatter',
          mode: 'lines',
          name: '',
          line: {
            color: '#17BECF',
            width: 3,
          },
          text: gReward,
          hovertemplate:
            '%{x}<br> supply per day : %{text:,}<br> Total supply : %{y:,}',
        },
      ],
      layout: {
        hovermode: 'closest',
        height: 250,
        autosize: true,
        xaxis: {
          linecolor: 'rgb(204,204,204)',
          linewidth: 2,
          tickformat: '%m-%d',
          tickangle: -45,
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true
        },
        yaxis: {
          title: 'Total Reward Supply',
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true,
          //tickformat :".0f",
          tickprefix: '                '
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
      options: null,
    };
  }

  blockspersecFunc(bDate, bPeriod) {
    this.areaGraphData = {
      data: [
        {
          x: bDate,
          y: bPeriod,
          text: bPeriod,
          name: '',
          hovertemplate: '%{x}<br> Seconds per Block : %{text:,}',
          fill: 'tozeroy',
          type: 'line',
          line: {
            color: 'rgb(100, 0, 160)',
          },
        },
      ],
      layout: {
        hovermode: 'closest',
        // width: 350,
        height: 250,
        autosize: true,
        xaxis: {
          tickformat: '%m-%d',
          tickangle: -45,
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true,
        },
        yaxis: {
          title: 'Seconds / Block',
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true,
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
      options: null,
    };
  }

  blockminedFunc(mDate, ProgPow, Cuckoo, RandomX, ProgPowper, Cuckooper, RandomXper) {
    this.doubleareaGraphData = {
      data: [
        {
          x: mDate,
          y: Cuckooper,
          text: Cuckoo,
          hovertemplate: 'Cuckoo : %{y} % ( %{text:,} )',
          hoverlabel: {namelength : 0},
          name: 'Cuckoo',
          fill: 'tozeroy',
          type: 'line',
          line: {
            color: '#f5ca19',
          },
        },
        // {
        //   x: mDate,
        //   y: Cuckatooper,
        //   text: Cuckatoo,
        //   hovertemplate: 'Cuckatoo :%{y} % ( %{text:,} )',
        //   name: '',
        //   fill: 'tozeroy',
        //   type: 'line',
        //   line: {
        //     color: '#f5c1a9',
        //   },
        // },
        {
          x: mDate,
          y: RandomXper,
          text: RandomX,
          hovertemplate: 'RandomX : %{y} % ( %{text:,} )',
          hoverlabel: {namelength : 0},
          fill: 'tozeroy',
          type: 'line',
          name: 'RandomX',
          line: {
            color: '#1ad5e9',
          },
        },
        {
          x: mDate,
          y: ProgPowper,
          text: ProgPow,
          hovertemplate: 'ProgPow : %{y} % ( %{text:,} )',
          hoverlabel: {namelength : 0},
          fill: 'tozeroy',
          type: 'line',
          name: 'ProgPow',
          line: {
            color: '#f74f4f',
          },
        },
      ],
      layout: {
        hovermode: 'closest',
        height: 250,
        autosize: true,
        showlegend: true,
        legend: {"orientation": "h",
        x: 0.35, y: -0.5,font :{ 'size': 10}},
        xaxis: {
          tickformat: '%m-%d',
          tickangle: -45,
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true,
        },
        yaxis: {
          title: 'Percentage(%)',
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true,
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
      },
      options: null,
    };
  }

  transactionheatmapFunc(tDate, tHour, tInput, hovertext) {
    return new Promise((resolve, reject) => {
      this.heatMapGrowthData = {
        data: [
          {
            x: tHour,
            y: tDate,
            z: tInput,
            name: '',
            text: hovertext,
            hovertemplate: hovertext + ': %{z:,} ',
            colorscale: 'Rainbow',
            type: 'heatmap',
            visible: true,
            colorbar: { thickness: 3 },
            xgap: 1,
            ygap: 1,
          },
        ],
        layout: {
          hovermode: 'closest',
          height: 250,
          //width: 365,
          autosize: true,
          annotations: [],
          font: {
            size: 8.5,
          },
          xaxis: {
            ticks: '',
            tickangle: screen.width < 767 ? '-90' : 360,
            side: 'top',
            autotick: false,
            showgrid: true,
            rangemode: 'nonnegative',
            fixedrange: true,
            autosize: true,
          },
          yaxis: {
            ticks: '',
            ticksuffix: ' ',
            tickformat: '%m-%d',
            autosize: true,
            showgrid: true,
            autotick: false,
            rangemode: 'nonnegative',
            fixedrange: true,
          },
          margin: {
            l: 30,
            r: 0,
            b: 50,
            t: 50,
          },
          showlegend: false,
        },
        options: null,
      };
      resolve();
    });
  }
  transactionlinechartFunc(Tdate, Ttotalinput, Ttotalkernal, Ttotaloutput) {
    this.feeGraphData = {
      data: [
        {
          type: 'scatter',
          mode: 'lines',
          name: 'Input',
          x: Tdate,
          y: Ttotalinput,
          text: Ttotalinput,
          hovertemplate: 'Total Input : %{text:,} ',
          hoverlabel: {namelength : 0},
          line: { color: '#6ebe58' },
        },
        {
          type: 'scatter',
          mode: 'lines',
          name: 'Kernal',
          x: Tdate,
          y: Ttotalkernal,
          text: Ttotalkernal,
          hovertemplate: 'Total Kernel : %{text:,} ',
          hoverlabel: {namelength : 0},
          line: { color: '#f57979' },
        },
        {
          type: 'scatter',
          mode: 'lines',
          name: 'Output',
          x: Tdate,
          y: Ttotaloutput,
          text: Ttotaloutput,
          hovertemplate: 'Total Output : %{text:,} ',
          hoverlabel: {namelength : 0},
          line: { color: '#f7d340' },
        },
      ],
      layout: {
        autosize: true,
        // width: 350,
        height: 250,
        xaxis: {
          showgrid: true,
          zeroline: false,
          tickformat: '%m-%d',
          rangemode: 'nonnegative',
          fixedrange: true,
        },
        yaxis: {
          showline: false,
          title: 'Transactions',
          rangemode: 'nonnegative',
          fixedrange: true,
          showgrid: true,
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
        showlegend: true,
        legend: {"orientation": "h",
        x: 0.05, y: -0.5,font :{ 'size': 10}}
      },
      options: null,
    };
  }
  transactiondoublelinechartFunc(Hdate, H29, H31) {
    this.blockGraphData = {
      data: [
        {
          type: 'scatter',
          mode: 'lines',
          name: '',
          x: Hdate,
          y: H29,
          text: H29,
          hovertemplate: 'cuckARoo29 : %{text:,} GH/s',
          line: { color: '#2a4bf7' },
        },
        {
          type: 'scatter',
          mode: 'lines',
          name: '',
          x: Hdate,
          y: H31,
          text: H31,
          hovertemplate: 'cuckAToo31 : %{text:,} GH/s',
          line: { color: '#3ff367' },
        },
      ],
      layout: {
        autosize: false,
        //width: 350,
        height: 250,
        xaxis: {
          showgrid: false,
          zeroline: false,
          tickformat: '%m-%d',
          fixedrange: true,
          rangemode: 'nonnegative'
        },
        yaxis: {
          showline: false,
          title: 'Estimated Hashrate (GH/s)',
          showgrid: true,
          fixedrange: true,
          rangemode: 'nonnegative',
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
        showlegend: false,
      },
      options: null,
    };
  }
  totaldifficultyChartFunc(DifficultychartDate, data, type, range, tickformat) {
    this.linearTotalGraphData = {
      data: data,
      layout: {
        // hovermode: 'closest',
        height: 250,
        autosize: true,
        showlegend: true,
        legend: {"orientation": "h",
        x: 0.1, y: -0.5,font :{ 'size': 10}},
        xaxis: {
          tickangle: -45,
          tickformat: tickformat,
          fixedrange: true,
          domain: [0.2, 0.8]
          // showgrid: true
        },
        yaxis: {
          title: 'Cuckoo',
          fixedrange: true,
          rangemode: 'nonnegative',
          // showgrid: true,
          // range: range
        },
        yaxis2: {
          title: 'Progpow',
          fixedrange: true,
          // showgrid: true,
          // range: range,
          overlaying: 'y',
          rangemode: 'nonnegative',
          side: 'left',
          position: 1.25
        },
        yaxis3: {
          title: 'RandomX',
          fixedrange: true,
          // showgrid: true,
          // range: range,
          rangemode: 'nonnegative',
          anchor: 'x',
          overlaying: 'y',
          side: 'right'

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
