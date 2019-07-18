import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {}

  public apiGetRequest(request: any, reqUrl): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}` + reqUrl, {
        params: request,
      })
      .pipe(
        map(res => {
          return res;
        }),
        catchError((error: HttpErrorResponse): any => throwError(error)),
      );
  }
  
   public GetTimer() {
    var countDownDate = new Date('Aug 1, 2019 00:00:00').getTime();

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
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
