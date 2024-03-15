import { Component, OnInit, ViewContainerRef, ViewChild,ComponentFactoryResolver} from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChartService } from '../../../shared/services/chart.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TransServiceService } from '../../../shared/services/trans-service.service';
import { map, catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { BlockAppendComponent } from '../block-append/block-append.component';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'epic-explorer-latestblocks',
  templateUrl: './latestblocks.component.html',
  styleUrls: ['./latestblocks.component.css'],
})
export class LatestblocksComponent implements OnInit {
  p: number = 1;

  public hashvalues: any;
  public pagedata: any = [];
  public Merged_data: any = [];
  public CurrentpageNumber: Number;
  public FirstPageListData: any = [];
  public DifferentList: any = [];
  public pool_epicmine: any = {};
  public pool_51pool: any = {};
  public poolUrl: string = 'https://51pool.online';
  public selectedpool = "51pool";
  public blockAppend: any;
  public blockdetails: any;
  public zibra_color = "zibra_white";
  public lastblock: any;
  public clickValue: any;
  public clickPeer: any;
  public beforeClick: boolean = false;
  public clickonMobile: boolean = true;
  public peers: any;
  first = true;
  currentBlockHeight;
  apiBlockInterval;
  CurrentPage;
  PageSize;
  pool51_hashrateCuckoo;
  pool51_hashrateProgPow;
  pool51_hashrateRandomX;
  pool51_onlineCuckoo;
  pool51_onlineProgPow;
  pool51_onlineRandomX;
  pool51_currentHeight;

  paginationForm = new FormGroup({
    pagesize: new FormControl(10),
  });

  @ViewChild('block', { read: ViewContainerRef,static: true }) block: ViewContainerRef;


  constructor(private chartService: ChartService,public translate: TransServiceService,public http: HttpClient, private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    // this. getpeersList();
    this.gettinghashList(1, 10, this.first);
    // this.getLastCeatedBlock();
    this.get51poolAPI();
    this.getepicmineAPI();
  }

  ngAfterViewInit() {
    this.apiBlockInterval = setInterval(() => {
      // console.log('getLastCeatedBlock called');
      if(this.selectedpool == 'epicmine'){
        this.getepicmineAPI();
      }else{
        this.get51poolAPI();
      }
      // let current_page = localStorage.getItem('CurrentPage');
      // let page_size = localStorage.getItem('PageSize');
      let current_page = this.CurrentPage;
      let page_size = this.PageSize;
      if( current_page && page_size){
        this.gettinghashList(current_page, page_size);
      }else{
        this.gettinghashList(1, 10);
      }
    }, 60 * 1000);
  }

  ngOnDestroy() {
    clearInterval(this.apiBlockInterval);
  }

  onMineChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    // console.log('Selected Value:', selectedValue);
    if(selectedValue == 'epicmine'){
      this.pool51_hashrateCuckoo = this.pool_epicmine.poolStats.hashrateCuckoo;
      this.pool51_hashrateProgPow = this.pool_epicmine.poolStats.hashrateProgPow;
      this.pool51_hashrateRandomX = this.pool_epicmine.poolStats.hashrateRandomX;
      this.pool51_onlineCuckoo = this.pool_epicmine.poolStats.onlineCuckoo;
      this.pool51_onlineProgPow = this.pool_epicmine.poolStats.onlineProgPow;
      this.pool51_onlineRandomX = this.pool_epicmine.poolStats.onlineRandomX;
      this.pool51_currentHeight = this.pool_epicmine.poolStats.currentHeight;
      this.poolUrl = 'https://epicmine.io/';
      this.selectedpool = 'epicmine';
    }else if(selectedValue == '51pool'){
      this.pool51_hashrateCuckoo = this.pool_51pool.hashrateCuckoo;
      this.pool51_hashrateProgPow = this.pool_51pool.hashrateProgPow;
      this.pool51_hashrateRandomX = this.pool_51pool.hashrateRandomX;
      this.pool51_onlineCuckoo = this.pool_51pool.onlineCuckoo;
      this.pool51_onlineProgPow = this.pool_51pool.onlineProgPow;
      this.pool51_onlineRandomX = this.pool_51pool.onlineRandomX;
      this.pool51_currentHeight = this.pool_51pool.currentHeight;
      this.poolUrl = 'https://51pool.online';
      this.selectedpool = '51pool';
    }
  }

  public get51poolAPI() {
    return new Promise<void>((resolve, reject) => {
      this.chartService.apiGetRequest('','/blockchain_block/get51poolapi').subscribe(
        res => {
          // console.log('get51poolAPI');
          // console.log(res);
          if (res['status'] == 200) {
            let json = res.response;
            // console.log(json.data);
            let poolStats = json.data.poolStats;
            this.pool_51pool = poolStats;
            this.pool51_hashrateCuckoo = poolStats.hashrateCuckoo;
            this.pool51_hashrateProgPow = poolStats.hashrateProgPow;
            this.pool51_hashrateRandomX = poolStats.hashrateRandomX;
            this.pool51_onlineCuckoo = poolStats.onlineCuckoo;
            this.pool51_onlineProgPow = poolStats.onlineProgPow;
            this.pool51_onlineRandomX = poolStats.onlineRandomX;
            this.pool51_currentHeight = poolStats.currentHeight;
          }
        },
        error => {},
      );
    });
  }

  public getepicmineAPI() {
    return new Promise<void>((resolve, reject) => {
      this.chartService.apiGetRequest('','/blockchain_block/getepicmineapi').subscribe(
        res => {
          if (res['status'] == 200) {
            let json = res.response;
            this.pool_epicmine = json;
            if(this.selectedpool == 'epicmine'){
              this.pool51_hashrateCuckoo = this.pool_epicmine.poolStats.hashrateCuckoo;
              this.pool51_hashrateProgPow = this.pool_epicmine.poolStats.hashrateProgPow;
              this.pool51_hashrateRandomX = this.pool_epicmine.poolStats.hashrateRandomX;
              this.pool51_onlineCuckoo = this.pool_epicmine.poolStats.onlineCuckoo;
              this.pool51_onlineProgPow = this.pool_epicmine.poolStats.onlineProgPow;
              this.pool51_onlineRandomX = this.pool_epicmine.poolStats.onlineRandomX;
              this.pool51_currentHeight = this.pool_epicmine.poolStats.currentHeight;        
            }
          }
        },
        error => {},
      );
    });
  }

  public gettinghashListFunc(currentPage,pagesize){
    this.hashvalues = "";
    this.gettinghashList(
      currentPage,
      pagesize
    )
  }

  public gettinghashList(CurrentPage, PageSize, first = false) {
    // console.log(CurrentPage, PageSize,this.first);
    this.CurrentPage = CurrentPage;
    this.PageSize = PageSize;
    // localStorage.setItem('CurrentPage',CurrentPage);
    // localStorage.setItem('PageSize',PageSize);
    let params = new HttpParams();
    this.CurrentpageNumber = CurrentPage;
    params = params.append('CurrentPage', CurrentPage);
    params = params.append('PageSize', PageSize);
    this.chartService.apiGetRequest(params, '/blockchain_block/list').subscribe(
      res => {
        if (res['status'] == 200) {
          this.pagedata = res.response;
          if(this.first){
            // console.log('init gettinghashList');
            res.response.BlockchainBlockResult.shift();
            this.currentBlockHeight = res.response.BlockchainBlockResult[0].blockchain_block_height;
            this.first = false;
            // console.log("this.currentBlockHeight-"+this.currentBlockHeight);
          }else{
            console.log('multi gettinghashList');
            if(this.currentBlockHeight && res.response.BlockchainBlockResult[0].blockchain_block_height){
              if(res.response.BlockchainBlockResult[0].blockchain_block_height > this.currentBlockHeight){
                let sizediff = res.response.BlockchainBlockResult[0].blockchain_block_height - this.currentBlockHeight;
                res.response.BlockchainBlockResult[0].blockchain_highlight = true;
                console.log(sizediff);
              }
            }
          }
          // console.log('datas');
          // console.log(res.response.BlockchainBlockResult);
          this.hashvalues = res.response.BlockchainBlockResult;
          if(CurrentPage == 1){
            this.FirstPageListData = res.response.BlockchainBlockResult;
            this.lastblock = res.response.BlockchainBlockResult[0].blockchain_block_height;
            //console.log(this.lastblock);

          }else{
            this.block.clear();
          }
        }
      },
      error => {},
    );
  }

  /*
  getLastCeatedBlock() {
    this.chartService.getLatestblockdetails().subscribe(response => {
      this.blockdetails = response;
      //console.log(this.blockdetails);
    
      if (this.CurrentpageNumber == 1) {
        var socket_array = this.blockdetails.BlockchainBlockResult;
        var ids = new Set(socket_array.map(d => d.blockchain_block_height));
        this.Merged_data = [...socket_array, ...this.FirstPageListData.filter(d => !ids.has(d.blockchain_block_height))];

        var onlyInA = this.FirstPageListData.filter(this.comparer(this.Merged_data));
        var onlyInB = this.Merged_data.filter(this.comparer(this.FirstPageListData));

        this.DifferentList = onlyInA.concat(onlyInB);

  
        this.DifferentList.sort((a, b) => (a.blockchain_block_height) - (b.blockchain_block_height));
        this.FirstPageListData = this.Merged_data;
        this.DifferentList.forEach(DifferentList_dub => {
          this.createBlock(DifferentList_dub);
        });


      }
      this.lastblock = this.blockdetails.block_height;
    });
  }
  */

  public comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other.blockchain_block_height == current.blockchain_block_height
      }).length == 0;
    }
  }

  public createBlock(DifferentList) {
    //this.FirstPageListData.push(DifferentList);
    const blockFactory = this.resolver.resolveComponentFactory(
      BlockAppendComponent,
    );
    const block = this.block.createComponent(blockFactory, 0);
    this.blockAppend = {};
    this.blockAppend['blockchain_block_hash'] = DifferentList.blockchain_block_hash;
    this.blockAppend[
      'blockchain_block_height'
    ] = DifferentList.blockchain_block_height;
    this.blockAppend['age'] = DifferentList.age;
    //this.blockAppend['target_difficulty'] = 0;
    this.blockAppend['PoWAlgo'] = DifferentList.powalgo;
    this.blockAppend['input_count'] = DifferentList.input_count;
    this.blockAppend['timetaken'] = DifferentList.timetaken;
    this.blockAppend['output_count'] = DifferentList.output_count;
    this.blockAppend['kernal_count'] = DifferentList.kernal_count;
    this.blockAppend['hashstart'] = DifferentList.hashstart;
    this.blockAppend['zibra_colour'] = this.zibra_color;
    if(this.zibra_color == "zibra_white"){
         this.zibra_color = "zibra_grey";
    }else{
      this.zibra_color = "zibra_white";
    }
    this.blockAppend['hashend'] = DifferentList.hashend;
    this.blockAppend['hasharray'] = DifferentList.hasharray;
    this.blockAppend['target_difficulty_cuckaroo'] = DifferentList.target_difficulty_cuckaroo;
    this.blockAppend['target_difficulty_cuckatoo'] = DifferentList.target_difficulty_cuckatoo;
    this.blockAppend['target_difficulty_progpow'] = DifferentList.target_difficulty_progpow;
    this.blockAppend['target_difficulty_randomx'] = DifferentList.target_difficulty_randomx;

    //console.log( this.blockAppend);

    block.instance.blockdetails = this.blockAppend;
  }

  public getpeersList() {
    this.chartService.apiGetRequest('','/blockchain_kernel/getpeers').subscribe(
      res => {
        if (res['status'] == 200) {
          let json = res.response.dataJson;
          if(json && json.length > 0){
            if(localStorage.getItem('network') == "Testnet"){
            localStorage.setItem('peersJson_Testnet',JSON.stringify(json));
            }else{
              localStorage.setItem('peersJson_Floonet',JSON.stringify(json));
            }
          }
          if(localStorage.getItem('network') == "Testnet"){
          this.peers = JSON.parse(localStorage.getItem('peersJson_Testnet'));
          }else{
            this.peers = JSON.parse(localStorage.getItem('peersJson_Floonet'));
          }
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
