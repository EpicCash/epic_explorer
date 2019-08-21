import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { throwError, Observable, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class ChartService {
  private server = environment.domain;
  private socket;
  private socketnetwork: any;

  constructor(public http: HttpClient) {
    if(localStorage.getItem('network') == null){
      this.socketnetwork = "Testnet"
    }else{
      this.socketnetwork = localStorage.getItem('network')
    }
        this.socket = io.connect(this.server, {query: 'network='+this.socketnetwork});
  }

  // public createSocketConnection() {
  //   console.log("environment.domain",environment.domain);
  //   this.socket = io.connect(this.server);
  //   this.socket.on("connect", function(socket) {
  //     console.log("Connected!");
  //   });
  // }

  public apiGetRequest(request: any, reqUrl): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}` + reqUrl, {
        params: request,
        headers: this.getHttpheader() 
      })
      .pipe(
        map(res => {
          return res;
        }),
        catchError((error: HttpErrorResponse): any => throwError(error))
      );
  }

  public getHttpheader(){
    var network;
    if(localStorage.getItem('network') == null){
      network = "Testnet"
    }else{
      network = localStorage.getItem('network')
    }
    return new HttpHeaders().set('network', network);
  }


  public getLatestblockdetails() {
    return Observable.create(observer => {
      this.socket.on("latestblockdetail", response => {
        observer.next(response);
      });
    });
  }

  public GetTimer() {
    var countDownDate = new Date("Aug 1, 2019 00:00:00").getTime();

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      return false;
    }
    let timerarr = { d: days, h: hours, m: minutes, s: seconds };
    return timerarr;
  }
}
