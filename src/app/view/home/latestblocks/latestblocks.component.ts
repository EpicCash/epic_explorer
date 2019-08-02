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
  public clickPeer: any;
  public beforeClick: boolean = false;
  public clickonMobile: boolean = true;
  public peers: any;
  
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

    this.http
    .get('http://5.9.174.122:3413/v1/peers/connected',httpOptions)
    .subscribe((res) => {
        console.log('reeeee',res);
        // this.peers = res;
        
        console.log('this.peers',this.peers);
      });
      this.peers = [{"id": 1,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"54.233.177.64:3414","direction":"Outbound","total_difficulty":{"cuckaroo":1630,"cuckatoo":706,"randomx":138024,"progpow":49792},"height":10},{"id": 2,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"95.216.102.217:3414","direction":"Outbound","total_difficulty":{"cuckaroo":1630,"cuckatoo":706,"randomx":138024,"progpow":49792},"height":10},{"id": 3,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"90.190.172.177:3414","direction":"Outbound","total_difficulty":{"cuckaroo":2,"cuckatoo":2,"randomx":1024,"progpow":256},"height":0},{"id": 4,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"67.189.82.196:3414","direction":"Outbound","total_difficulty":{"cuckaroo":1630,"cuckatoo":706,"randomx":138024,"progpow":49792},"height":10},{"id": 5,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"167.71.72.2:3414","direction":"Outbound","total_difficulty":{"cuckaroo":1630,"cuckatoo":706,"randomx":138024,"progpow":49792},"height":10}];
}

  

  public onClickPlus(height) {
    // this.beforeClick = true;
    this.clickValue = 'hash_' + height;
  }

  public onClickMinus(height) {
    this.clickValue = 0;
  }

  public onClickPeerPlus(id) {
    // this.beforeClick = true;
    this.clickPeer = 'peer_' + id;
  }

  public onClickPeerMinus(id) {
    this.clickPeer = 0;
  }
}
