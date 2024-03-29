import {
    Component,
    ViewChild,
    ElementRef,
    Input,
    AfterViewInit,
  } from '@angular/core';
  import { environment } from '../../../../environments/environment';

  @Component({
    selector: 'epic-explorer-plotly',
    templateUrl: './plotly.component.html',
    styleUrls: ['./plotly.component.css'],
  })
  export class PlotlyComponent implements AfterViewInit {
    @ViewChild('plotly', {static: false}) plotly !: ElementRef;
    private _data: any;
    private _layout: any;
    private _options: any;
    private _plotlyJs: any;
    constructor() {
      import('plotly.js/dist/plotly-cartesian.js').then(Plotly => {
        //stringHelpers.reverse('Hello World');
        this._plotlyJs=Plotly;
        this.showChart();
      });
    }
    @Input() set data(data: any) {
      this._data = data;
      if(this._plotlyJs){
          this.showChart();
        }
    }
    get data(): any {
      return this._data;
    }
    @Input() set layout(layout: any) {
      this._layout = layout;
      if(this._plotlyJs){
        this.showChart();
      }
    }

    get layout(): any {
      return this._layout;
    }
    dataarr(data: any):void {
      console.log(data);
    }
    @Input() set options(options: any) {
       this._options = options;
       if(this._plotlyJs){
        this.showChart();
      }
    }
    get options(): any {
      return this._options;
    }
    showChart(){
      try {
        if (typeof this._plotlyJs.newPlot === "function") {
          this._plotlyJs.newPlot(
            this.plotly.nativeElement,
            this._data,
            this._layout,
            this._options,
          );
      }

      }
      catch (error) {
        console.error('Log error', error);
      }

    }
    ngAfterViewInit() {
      if(this._plotlyJs){
        this.showChart();
      }

    }
  }
