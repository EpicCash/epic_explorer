import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChartService } from '../../../shared/services/chart.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TransServiceService } from '../../../shared/services/trans-service.service';
import { map, catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

@Component({
  selector: 'epic-explorer-latestblocks',
  templateUrl: './latestblocks.component.html',
  styleUrls: ['./latestblocks.component.css'],
})
export class LatestblocksComponent implements OnInit {
  public hashvalues: any;
  public pagedata: any = [];
  public clickValue: any;
  public beforeClick: boolean = false;
  public clickonMobile: boolean = true;
  paginationForm = new FormGroup({
    pagesize: new FormControl(20),
  });

  constructor(private chartService: ChartService,public translate: TransServiceService,public http: HttpClient) {}

  ngOnInit() {
    this. getpeersList();
    this.gettinghashList(1, 20);
  }

  public gettinghashList(CurrentPage, PageSize) {
    let params = new HttpParams();
    params = params.append('CurrentPage', CurrentPage);
    params = params.append('PageSize', PageSize);
    this.chartService.apiGetRequest(params, '/blockchain_block/list').subscribe(
      res => {
        if (res['status'] == 200) {
          this.pagedata = res.response;
          this.hashvalues = res.response.BlockchainBlockResult;
        }
      },
      error => {},
    );
  }

  public getpeersList() {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };

    console.log('EEE');
    this.http
    .get('http://5.9.174.122:3413/v1/peers/connected',httpOptions)
    .subscribe((res) => {
        console.log('reeeee',res);
      });
}

  

  public onClickPlus(height) {
    // this.beforeClick = true;
    this.clickValue = 'hash_' + height;
  }

  public onClickMinus(height) {
    this.clickValue = 0;
  }
}
