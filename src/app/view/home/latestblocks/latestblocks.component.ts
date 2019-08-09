import { Component, OnInit, ViewContainerRef, ViewChild,ComponentFactoryResolver} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChartService } from '../../../shared/services/chart.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TransServiceService } from '../../../shared/services/trans-service.service';
import { map, catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { BlockAppendComponent } from '../block-append/block-append.component';

@Component({
  selector: 'epic-explorer-latestblocks',
  templateUrl: './latestblocks.component.html',
  styleUrls: ['./latestblocks.component.css'],
})
export class LatestblocksComponent implements OnInit {
  public hashvalues: any;
  public pagedata: any = [];
  public blockAppend: any;
  public blockdetails: any;
  public lastblock: any;
  public clickValue: any;
  public clickPeer: any;
  public beforeClick: boolean = false;
  public clickonMobile: boolean = true;
  public peers: any;

  paginationForm = new FormGroup({
    pagesize: new FormControl(20),
  });

  @ViewChild('block', { read: ViewContainerRef,static: true }) block: ViewContainerRef;


  constructor(private chartService: ChartService,public translate: TransServiceService,public http: HttpClient, private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this. getpeersList();
    this.gettinghashList(1, 20);
    this.getLastCeatedBlock();
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
          if(CurrentPage == 1){
            this.lastblock = res.response.BlockchainBlockResult[0].blockchain_block_height;
            //console.log(this.lastblock);

          }
        }
      },
      error => {},
    );
  }

  getLastCeatedBlock() {
    this.chartService.getLatestblockdetails().subscribe(response => {
      this.blockdetails = response;
      //console.log(this.blockdetails);
      if (this.lastblock != this.blockdetails.block_height) {
        //console.log('Create');
        this.createBlock();
      }
      this.lastblock = this.blockdetails.block_height;
      //console.log(this.lastblock);
    });
  }

  public createBlock() {
    const blockFactory = this.resolver.resolveComponentFactory(
      BlockAppendComponent,
    );
    const block = this.block.createComponent(blockFactory, 0);
    this.blockAppend = {};
    this.blockAppend['blockchain_block_hash'] = this.blockdetails.hash;
    this.blockAppend[
      'blockchain_block_height'
    ] = this.blockdetails.block_height;
    this.blockAppend['age'] = this.blockdetails.age;
    this.blockAppend['target_difficulty'] = this.blockdetails.Difficulty;
    this.blockAppend['PoWAlgo'] = this.blockdetails.proof;
    this.blockAppend['input_count'] = this.blockdetails.input_count;
    this.blockAppend['output_count'] = this.blockdetails.output_count;
    this.blockAppend['kernal_count'] = this.blockdetails.kernel_count;
    this.blockAppend['hashstart'] = this.blockdetails.hashstart;
    this.blockAppend['hashend'] = this.blockdetails.hashend;
    this.blockAppend['hasharray'] = this.blockdetails.hasharray;

    block.instance.blockdetails = this.blockAppend;
  }

  public getpeersList() {
    this.chartService.apiGetRequest('','/blockchain_kernel/getpeers').subscribe(
      res => {
        if (res['status'] == 200) {
          this.peers = res.response.dataJson;
        }
      },
      error => {},
    );
      // this.peers = [{"id": 1,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"54.233.177.64:3414","direction":"Outbound","total_difficulty":{"cuckaroo":1630,"cuckatoo":706,"randomx":138024,"progpow":49792},"height":10},{"id": 2,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"95.216.102.217:3414","direction":"Outbound","total_difficulty":{"cuckaroo":1630,"cuckatoo":706,"randomx":138024,"progpow":49792},"height":10},{"id": 3,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"90.190.172.177:3414","direction":"Outbound","total_difficulty":{"cuckaroo":2,"cuckatoo":2,"randomx":1024,"progpow":256},"height":0},{"id": 4,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"67.189.82.196:3414","direction":"Outbound","total_difficulty":{"cuckaroo":1630,"cuckatoo":706,"randomx":138024,"progpow":49792},"height":10},{"id": 5,"capabilities":{"bits":15},"user_agent":"MW/Epic 1.0.0","version":1,"addr":"167.71.72.2:3414","direction":"Outbound","total_difficulty":{"cuckaroo":1630,"cuckatoo":706,"randomx":138024,"progpow":49792},"height":10}];
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
