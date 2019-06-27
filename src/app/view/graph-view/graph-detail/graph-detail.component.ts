import { Component, OnInit, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ChartService } from '../../../shared/services/chart.service';
import { ActivatedRoute } from '@angular/router';
import { GraphListComponent } from '../../home/graph-list/graph-list.component';

@Component({
  providers: [GraphListComponent],
  selector: 'app-graph-detail',
  templateUrl: './graph-detail.component.html',
  styleUrls: ['./graph-detail.component.css'],
})
export class GraphDetailComponent implements OnInit {
  public hashdata: any = [];
  public title: any;
  public chartType : any = [];
  public selectedItem=3;
  constructor(
    private route: ActivatedRoute,
    private chartService: ChartService,
    private comp: GraphListComponent,
  ) {}
  ngOnInit() {
    this.chartType = this.route.snapshot.params.hashid;
    switch(this.chartType){
      case "difficulty":
          this.comp.Difficultyreq().then(res => {
            this.hashdata = this.comp.linearGraphData;
            this.hashdata.layout.height=500;
            this.title="Difficulty";
            console.log(this.hashdata);
          });
      break;
      case "transactionsbytime":
          this.comp.Transactionheatmapreq().then(res => {
            this.hashdata = this.comp.heatMapGrowthData;
            this.hashdata.layout.height=500;
            this.title="Transactions by time";
          });
      break;
      case "block":
          this.comp.Difficultyreq().then(res => {
            this.hashdata = this.comp.barGraphData;
            this.hashdata.layout.height=500;
            this.title="Block";
          });
      break;
      case "transactionsfee":
          this.comp.Transcationreq().then(res => {
            this.hashdata = this.comp.transcationGraphData;
            console.log(this.hashdata);
            this.hashdata.layout.height=500;
            this.title="Transactions Fee";
          });
      break;
      case "supplygrowth":
          this.comp.Growthreq().then(res => {
            this.hashdata = this.comp.growthGraphData;
            this.hashdata.layout.height=500;
            this.title="Supply Growth";
          });
      break;
      case "blocksmined":
          this.comp.Blockminedreq().then(res => {
            this.hashdata = this.comp.doubleareaGraphData;
            this.hashdata.layout.height=500;
            this.title="Blocks Mined";
          });
      break;
      case "hashrategrowth":
          this.comp.Transactiondoublelinechartreq().then(res => {
            this.hashdata = this.comp.blockGraphData;
            this.hashdata.layout.height=500;
            this.hashdata.layout.width=window.innerWidth-10;
            this.title="Hash Rate Growth";
          });
      break;
      case "blockinterval":
          this.comp.Blockspersecreq().then(res => {
            this.hashdata = this.comp.areaGraphData;
            this.hashdata.layout.height=500;
            this.title="Block Interval";
          });
      break;
      case "transactionsdate":
          this.comp.Transactionlinechartreq().then(res => {
            this.hashdata = this.comp.feeGraphData;
            this.hashdata.layout.height=500;
            this.hashdata.layout.width=window.innerWidth-10;
            console.log(this.hashdata.layout.width);
            this.title="Transactions Vs Date";
          });
      break;

    }

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

    switch(this.chartType){
      case "difficulty":
        this.comp
        .Difficultyreq(p1, p2, p3, p4, p5)
        .then(res => {
          this.hashdata = this.comp.linearGraphData;
          this.hashdata.layout.height=500;
          this.title="Difficulty";
        });
      break;
      case "transactionsbytime":
          this.comp
        .transactionheatmapFunc(p1, p2, p3, p4)
        .then(res => {
          this.hashdata = this.comp.heatMapGrowthData;
          this.hashdata.layout.height=500;
          this.title="Transactions by time";
        });
      break;
      case "block":
          this.comp
        .Difficultyreq(p1, p2, p3, false, true)
        .then(res => {
          this.hashdata = this.comp.barGraphData;
          this.hashdata.layout.height=500;
          this.title="Block";
        });
      break;
      case 'blocksmined':
        this.comp.Blockminedreq(p1, p2, p3).then(res => {
          this.hashdata = this.comp.doubleareaGraphData;
          this.hashdata.layout.height = 500;
          this.title = 'Blocks Mined';
        });
        break;
      case "transactionsfee":
          this.comp
        .Transcationreq(p1, p2, p3)
        .then(res => {
          this.hashdata = this.comp.transcationGraphData;
          this.hashdata.layout.height=500;
          this.title="Transactions Fee";
        });
      break;
      case "supplygrowth":
          this.comp
        .Growthreq(p1, p2, p3)
        .then(res => {
          this.hashdata = this.comp.growthGraphData;
          this.hashdata.layout.height=500;
          this.title="Supply Growth";
        });
      break;
      case "Transactiondoublelinechartreq":
          this.comp
        .Blockminedreq(p1, p2, p3)
        .then(res => {
          this.hashdata = this.comp.doubleareaGraphData;
          this.hashdata.layout.height=500;
          this.title="Blocks Mined";
        });
      break;
      case "hashrategrowth":
          this.comp
        .Transactiondoublelinechartreq(p1, p2, p3)
        .then(res => {
          this.hashdata = this.comp.blockGraphData;
          this.hashdata.layout.height=500;
          this.hashdata.layout.width=window.innerWidth-10;
          this.title="Hash Rate Growth";
        });
      break;
      case "blockinterval":
          this.comp
        .Blockspersecreq(p1, p2, p3)
        .then(res => {
          this.hashdata = this.comp.areaGraphData;
          this.hashdata.layout.height=500;
          this.title="Block Interval";
        });
      break;
      case "transactionsdate":
          this.comp
          .Transactionlinechartreq(p1, p2, p3)
          .then(res => {
            this.hashdata = this.comp.feeGraphData;
            this.hashdata.layout.height=500;
            this.hashdata.layout.width=window.innerWidth-10;
            this.title="Transactions Vs Date";
          });
      break;
    }

    }

}
