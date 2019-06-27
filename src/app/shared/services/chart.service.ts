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
}
