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
      this.viewchartvar = true;
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
              let today_date_index = sDate.indexOf(moment(Date.now()).format('YYYY-MM-DD'));
              this.sg_last = RandomX[today_date_index] +  ProgPow[today_date_index] +  Cuckoo[today_date_index];
              //this.sg_last = RandomX[RandomX.length - 1];
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
              let today_date_index = Tdate.indexOf(moment(Date.now()).format('YYYY-MM-DD'));
              this.tg_last = parseInt(Ttotalinput[today_date_index]) + parseInt(Ttotalkernal[today_date_index]) + parseInt(Ttotaloutput[today_date_index]);
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

              let today_date_index = mDate.indexOf(moment(Date.now()).format('YYYY-MM-DD'));
              
              this.dg_last = ProgPow[today_date_index] + Cuckoo[today_date_index] + RandomX[today_date_index];

              //this.dg_last = RandomXper[RandomXper.length - 1];
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
              let today_date_index = bDate.indexOf(moment(Date.now()).format('YYYY-MM-DD'));
              this.ag_last = bPeriod[today_date_index];
              //this.ag_last = bPeriod[bPeriod.length - 1];
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
              let today_date_index = gDate.indexOf(moment(Date.now()).format('YYYY-MM-DD'));
              //let today_date_index = gDate.indexOf('2019-08-06');
              //this.gg_last = gReward[today_date_index];
              this.gg_last = "16";
              let range = [];
              if(gaddedreward.length == 1 && gaddedreward[0]!= 0){
                range = [ (gaddedreward[0] - (gaddedreward[0] * 0.3)), (gaddedreward[0] + (gaddedreward[0] * 0.3)) ];
              }
              //this.gg_last = gReward[gReward.length - 1];
              this.growthFunc(gDate, gReward, gaddedreward, range);
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
              let today_date_index = TfDate.indexOf(moment(Date.now()).format('YYYY-MM-DD'));
              this.fg_last = TfFee[today_date_index];
              //this.fg_last = TfFee[TfFee.length - 1];
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
                        line: { color: '#f5c330' },
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
                        line: { color: '#0091ff' },
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
                        line: { color: '#48dc6b' },
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
                        line: { color: '#48dc6b' },
                        hovertemplate: '%{text}<br> Difficulty : %{y:,}',
                      }];
                  break;
              }
              let range1 = [];
              let range2 = [];
              let range3 = [];              // res.response.Minrange, res.response.Maxrange
              if(DifficultychartDate.length == 1 && DifficultyCuckatoo[0] != 0 && DifficultyRandomx[0] != 0 && DifficultyProgpow[0] != 0){
                    range1 = [ (DifficultyCuckatoo[0] - (DifficultyCuckatoo[0] * 0.3)), (DifficultyCuckatoo[0] + (DifficultyCuckatoo[0] * 0.3)) ];
                    range2 = [ (DifficultyRandomx[0] - (DifficultyRandomx[0] * 0.3)), (DifficultyRandomx[0] + (DifficultyRandomx[0] * 0.3)) ];
                    range3 = [ (DifficultyProgpow[0] - (DifficultyProgpow[0] * 0.3)), (DifficultyProgpow[0] + (DifficultyProgpow[0] * 0.3)) ];
              }
              let tickformat = res.response.tickFormat;
              // this.lg_last =
              // TargetDifficulty[TargetDifficulty.length - 1];

              switch (difftype) {
                case 'total':
                  this.totaldifficultyChartFunc(
                    DifficultychartDate,
                    data,
                    this.Type,
                    range1,
                    range2,
                    range3,
                    tickformat
                  );
                  break;
                case 'target':
                  this.difficultyChartFunc(
                    DifficultychartDate,
                    data,
                    this.Type,
                    range1,
                    range2,
                    range3,
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
              let BlocksChartHeight = res.response.Blocks;
              let Blockval = res.response.alter;
              this.blockinteval_last = Blockval[Blockval.length - 1];
              var range = [ BlocksChartHeight[0], BlocksChartHeight[BlocksChartHeight.length-1] ];
              this.BlocksIntevalFunc(BlocksChartHeight, Blockval, range);
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
              let today_date_index = BlocksChartDate.indexOf(moment(Date.now()).format('YYYY-MM-DD'));
              this.brg_last = Blockval[today_date_index];
              //this.brg_last = Blockval[Blockval.length - 1];
              this.totalBlocksFunc(BlocksChartDate, Blockval);
              resolve();
            }
          },
          error => { },
        );
    });
  }

  difficultyChartFunc(DifficultychartDate, data, Type, range1, range2, range3, tickformat) {
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
          rangemode: 'nonnegative',
          // showgrid: true,
          range: range1
        },
        yaxis2: {
          title: 'Progpow',
          fixedrange: true,
          // showgrid: true,
          range: range3,
          overlaying: 'y',
          rangemode: 'nonnegative',
          side: 'left',
          position: 1.25
        },
        yaxis3: {
          title: 'RandomX',
          fixedrange: true,
          // showgrid: true,
          range: range2,
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
            color: '#bf9b30',
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
            color: '#48dc6b',
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
            color: '#0091ff',
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
        width: 350,
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

  BlocksIntevalFunc(BlocksChartHeight, Blockval, range) {
    this.barGraphIntevalData = {
      data: [
        {
          x: BlocksChartHeight,
          y: Blockval,
          text: Blockval,
          name: '',
          hovertemplate: 'Block #%{x}<br> Interval : %{text:,}s',
          type: 'bar',
          marker: {
            color: '#bf9b30',
            colorscale: 'Viridis',
          },
        },
        {
          name: 'Average Block Interval',
          y: [60],
          orientation: 'h',
          type: 'bar'
        }
      ],
      layout: {
        hovermode: 'closest',
        height: 250,
        autosize: true,
        showlegend: false,
        xaxis: {
          tickangle: -45,
          range: range,
          showgrid: true,
          title: 'Block Height',
          rangemode: 'nonnegative',
          fixedrange: true
        },
        yaxis: {
          title: 'Seconds',
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
        console.log(this.barGraphIntevalData.data)
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
            color: "#bf9b30",
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
          line: {
            color: '#bf9b30',
          },
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

  growthFunc(gDate, gReward, gaddedreward, range) {
    this.growthGraphData = {
      data: [
        {
          x: gDate,
          y: gaddedreward,
          // type: 'line',
          //mode: 'lines',
          //fill: 'tozeroy',
          type: 'line',
          name: '',
          line: {
            color: '#bf9b30',
            width: 3,
          },
          text: gReward,
          hovertemplate:
            '%{x}<br> Supply per day : %{text:,}<br> Total supply : %{y:,}',
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
          range : range,
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
            color: '#bf9b30',
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
            color: '#bf9b30',
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
            color: '#0091ff',
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
            color: '#48dc6b',
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
            colorscale: [[0.0, "rgb(107,113,229"],
                [0.1111111111111111, "rgb(0,145,255)"],
                [0.2222222222222222, "rgb(44,187,232)"],
                [0.3333333333333333, "rgb(97,211,254)"],
                [0.4444444444444444, "rgb(72,220,107)"],
                [0.5555555555555556, "rgb(255,72,102)"],
                [0.6666666666666666, "rgb(254,85,51)"],
                [0.7777777777777778, "rgb(255,166,0)"],
                [0.8888888888888888, "rgb(255,209,0)"],
                [1.0, "rgb(255,209,0)"]],
            //colors : colorRamp(c("red", "green")),
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
          line: { color: '#bf9b30' },
        },
        {
          type: 'scatter',
          mode: 'lines',
          name: 'Kernel',
          x: Tdate,
          y: Ttotalkernal,
          text: Ttotalkernal,
          hovertemplate: 'Total Kernel : %{text:,} ',
          hoverlabel: {namelength : 0},
          line: { color: '#0091ff' },
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
          line: { color: '#48dc6b' },
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
  totaldifficultyChartFunc(DifficultychartDate, data, type, range1, range2, range3, tickformat) {
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
          range: range1,
        },
        yaxis2: {
          title: 'Progpow',
          fixedrange: true,
          // showgrid: true,
          range: range3,
          overlaying: 'y',
          rangemode: 'nonnegative',
          side: 'right',
          position: 1.25
        },
        yaxis3: {
          title: 'RandomX',
          fixedrange: true,
          // showgrid: true,
          range: range2,
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
