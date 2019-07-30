import { Component, OnInit, Input } from '@angular/core';
import { ChartService } from '../../../shared/services/chart.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransServiceService } from '../../../shared/services/trans-service.service';

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
  public blockGraphData: any = [];
  public bubbleGraphdData: any = [];
  public feeGraphData: any = [];
  public growthGraphData: any = [];
  public heatMapGrowthData: any = [];
  public transcationGraphData: any = [];
  public stackGraphData: any = [];
  public pieGraphData: any = [];

  public lg_last: any = '';
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

  public selectedItem: Number = 3;
  public selectedItem3: Number = 3;
  public selectedItem2: Number = 3;
  public selectedItem4: Number = 3;
  public selectedItem5: Number = 3;
  public selectedItem7: Number = 3;
  public selectedItem8: Number = 1;
  public selectedItem9: Number = 3;
  public selectedItem10: Number = 3;
  public selectedItem11: Number = 3;

  public tInput: any;
  public tOutput: any;
  public tKernal: any;
  public tDate: any;
  public tHour: any;

  constructor(private chartService: ChartService, private http: HttpClient,public translate: TransServiceService) {}

  ngOnInit() {
    /* Total Difficulty and blocks chart fetching */
    this.Difficultyreq();

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
    this.Transactiondoublelinechartreq();

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
          error => {},
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
              let Cuckaroo = res.response.Cuckaroo;
              let Cuckatoo = res.response.Cuckatoo;
              let ProgPow = res.response.ProgPow;
              let RandomX = res.response.RandomX;
                this.sg_last =
                RandomX[RandomX.length - 1];
                this.stackchartFunc(
                  sDate,
                  Cuckaroo,
                  Cuckatoo,
                  ProgPow,
                  RandomX
                );
              resolve();
            }
          },
          error => {},
        );
    });
  }
  
  Transactiondoublelinechartreq(fromDate = '', ToDate = '', interval = '') {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/hashrate')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let Hdate = res.response.date;
              let H29 = res.response.hashrate29;
              let H31 = res.response.hashrate31;
              this.hg_last = H31[H31.length - 1];
              this.transactiondoublelinechartFunc(Hdate, H29, H31);
              resolve();
            }
          },
          error => {},
        );
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
          error => {},
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
                this.tInput,
                'Input',
              );
              resolve();
            }
          },
          error => {},
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
              let Cuckaroo = res.response.Cuckaroo;
              let Cuckatoo = res.response.Cuckatoo;
              let RandomX = res.response.RandomX;
              
              let ProgPowper = res.response.ProgPowper;
              let Cuckarooper = res.response.Cuckarooper;
              let Cuckatooper = res.response.Cuckatooper;
              let RandomXper = res.response.RandomXper;

              this.dg_last = RandomXper[RandomXper.length - 1];
              this.blockminedFunc(
                mDate,
                ProgPow,
                Cuckaroo,
                Cuckatoo,
                RandomX,
                ProgPowper,
                Cuckarooper,
                Cuckatooper,
                RandomXper,
              );
              resolve();
            }
          },
          error => {},
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
          error => {},
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
          error => {},
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
          error => {},
        );
    });
  }

  Difficultyreq(
    fromDate = '',
    ToDate = '',
    interval = '',
    fordifficult = true,
    forblocks = true,
  ) {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      params = params.append('FromDate', fromDate);
      params = params.append('ToDate', ToDate);
      params = params.append('Interval', interval);
      this.chartService
        .apiGetRequest(params, '/blockchain_block/totaldiffnblock')
        .subscribe(
          res => {
            if (res['status'] == 200) {
              let DifficultychartDate = res.response.Date;
              if (fordifficult) {
                let DifficultyCuckaroo = res.response.DifficultyCuckaroo;
                let DifficultyCuckatoo = res.response.DifficultyCuckatoo;
                let DifficultyProgpow = res.response.DifficultyProgpow;
                let DifficultyRandomx = res.response.DifficultyRandomx;
                this.lg_last =
                DifficultyCuckaroo[DifficultyCuckaroo.length - 1];
                this.difficultyChartFunc(
                  DifficultychartDate,
                  DifficultyCuckaroo,
                  DifficultyCuckatoo,
                  DifficultyProgpow,
                  DifficultyRandomx
                );
              }
              if (forblocks) {
                let Blockval = res.response.Blocks;
                this.brg_last = Blockval[Blockval.length - 1];
                this.totalBlocksFunc(DifficultychartDate, Blockval);
              }
              resolve();
            }
          },
          error => {},
        );
    });
  }

  difficultyChartFunc(DifficultychartDate, DifficultyCuckaroo, DifficultyCuckatoo, DifficultyProgpow, DifficultyRandomx) {
    this.linearGraphData = {
      data: [
        {
          x: DifficultychartDate,
          y: DifficultyCuckaroo,
          text: DifficultyCuckaroo,
          mode: 'lines+markers',
          type: 'scatter',
          name: '',
          line: { color: '#ac3333' },
          hovertemplate: '%{x}<br> Cuckaroo : %{text:,}',
        },
        {
          x: DifficultychartDate,
          y: DifficultyCuckatoo,
          text: DifficultyCuckatoo,
          mode: 'lines+markers',
          type: 'scatter',
          name: '',
          line: { color: '#A876C6' },
          hovertemplate: '%{x}<br> Cuckatoo : %{text:,}',
        },
        {
          x: DifficultychartDate,
          y: DifficultyProgpow,
          text: DifficultyProgpow,
          mode: 'lines+markers',
          type: 'scatter',
          name: '',
          line: { color: '#54CFDC' },
          hovertemplate: '%{x}<br> Progpow : %{text:,}',
        },
        {
          x: DifficultychartDate,
          y: DifficultyRandomx,
          text: DifficultyRandomx,
          mode: 'lines+markers',
          type: 'scatter',
          name: '',
          line: { color: '#77817C' },
          hovertemplate: '%{x}<br> Randomx : %{text:,}',
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

  stackchartFunc(sDate, Cuckaroo, Cuckatoo, ProgPow, RandomX) {
    this.stackGraphData = {
      data: [
        {
          x: sDate,
          y: Cuckaroo,
          name: '',
          type: 'bar',
          text: Cuckaroo,
          hovertemplate: '%{x}<br> Cuckatoo : %{text:,}',
          marker: {
            color: '#77817C',
          },
        },
        {
          x: sDate,
          y: Cuckatoo,
          name: '',
          type: 'bar',
          text: Cuckatoo,
          hovertemplate: '%{x}<br> Cuckaroo : %{text:,}',
          marker: {
            color: '#54CFDC',
          },
        },
        {
          x: sDate,
          y: ProgPow,
          name: '',
          type: 'bar',
          text: ProgPow,
          hovertemplate: '%{x}<br> ProgPow : %{text:,}',
          marker: {
            color: '#825f5f',
          },
        },
        {
          x: sDate,
          y: RandomX,
          name: '',
          type: 'bar',
          text: RandomX,
          hovertemplate: '%{x}<br> RandomX : %{text:,}',
          marker: {
            color: '#a9df5f',
          },
        }

      ],
      layout: {
        hovermode: 'closest',
        width: 350,
        height: 250,
        autosize: true,
        showlegend: false,
        barmode: 'relative',
        xaxis: {
          tickangle: -45,
          tickformat: '%m-%d',
        },
        yaxis: {
          title: 'Block',
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
        autosize: true,
        showlegend: false,
       xaxis: {
          tickangle: -45,
          tickformat: '%m-%d',
        },
        yaxis: {
          title: 'Block',
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
        },
        yaxis: {
          title: 'Block',
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
        },
        yaxis: {
          title: 'Tx Fee',
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
            '%{x}<br> supply per day: %{text:,}<br> Total supply: %{y:,}',
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
        },
        yaxis: {
          title: 'Total Reward Supply',
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
          hovertemplate: '%{x}<br> Blocks Per Sec : %{text:,}',
          fill: 'tozeroy',
          type: 'line',
          line: {
            color: 'rgb(100, 0, 160)',
          },
        },
      ],
      layout: {
        hovermode: 'closest',
        width: 350,
        height: 250,
        autosize: false,
        xaxis: {
          tickformat: '%m-%d',
          tickangle: -45,
        },
        yaxis: {
          title: 'Block / sec',
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

  blockminedFunc(mDate,ProgPow, Cuckaroo, Cuckatoo, RandomX, ProgPowper, Cuckarooper, Cuckatooper, RandomXper) {
    this.doubleareaGraphData = {
      data: [
        {
          x: mDate,
          y: Cuckarooper,
          text: Cuckaroo,
          hovertemplate: 'Cuckaroo :%{y} % ( %{text:,} )',
          name: '',
          fill: 'tozeroy',
          type: 'line',
          line: {
            color: '#f5ca19',
          },
        },
        {
          x: mDate,
          y: Cuckatooper,
          text: Cuckatoo,
          hovertemplate: 'Cuckatoo :%{y} % ( %{text:,} )',
          name: '',
          fill: 'tozeroy',
          type: 'line',
          line: {
            color: '#f5c1a9',
          },
        },
        {
          x: mDate,
          y: RandomXper,
          text: RandomX,
          hovertemplate: 'RandomX :%{y} % ( %{text:,} )',
          fill: 'tozeroy',
          type: 'line',
          name: '',
          line: {
            color: '#1ad5e9',
          },
        },
        {
          x: mDate,
          y: ProgPowper,
          text: ProgPow,
          hovertemplate: 'ProgPow :%{y} % ( %{text:,} )',
          fill: 'tozeroy',
          type: 'line',
          name: '',
          line: {
            color: '#f74f4f',
          },
        },
      ],
      layout: {
        hovermode: 'closest',
        height: 250,
        autosize: true,
        showlegend: false,
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
        width: 365,
        autosize: true,
        annotations: [],
        font: {
          size: 8.5,
        },
        xaxis: {
          ticks: '',
          tickangle: 360,
          side: 'top',
          autotick: false,
          showgrid: true,
        },
        yaxis: {
          ticks: '',
          ticksuffix: ' ',
          tickformat: '%m-%d',
          autosize: false,
          showgrid: true,
          autotick: false,
        },
        margin: {
          l: 30,
          r: 30,
          b: 60,
          t: 60,
        },
        showlegend: false,
      },
      options: null,
    };
  });
  }
  transactionlinechartFunc(Tdate, Ttotalinput, Ttotalkernal, Ttotaloutput) {
    this.feeGraphData = {
      data: [
        {
          type: 'scatter',
          mode: 'lines',
          name: '',
          x: Tdate,
          y: Ttotalinput,
          text: Ttotalinput,
          hovertemplate: 'Total Input : %{text:,} ',
          line: { color: '#6ebe58' },
        },
        {
          type: 'scatter',
          mode: 'lines',
          name: '',
          x: Tdate,
          y: Ttotalkernal,
          text: Ttotalkernal,
          hovertemplate: 'Total Kernel : %{text:,} ',
          line: { color: '#f57979' },
        },
        {
          type: 'scatter',
          mode: 'lines',
          name: '',
          x: Tdate,
          y: Ttotaloutput,
          text: Ttotaloutput,
          hovertemplate: 'Total Output : %{text:,} ',
          line: { color: '#f7d340' },
        },
      ],
      layout: {
        autosize: true,
        width: 350,
        height: 250,
        xaxis: {
          showgrid: false,
          zeroline: false,
          tickformat: '%m-%d',
        },
        yaxis: {
          showline: false,
          title: 'Transactions',
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
        autosize: true,
        width: 350,
        height: 250,
        xaxis: {
          showgrid: false,
          zeroline: false,
          tickformat: '%m-%d',
        },
        yaxis: {
          showline: false,
          title: 'Estimated Hashrate (GH/s)',
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
}
