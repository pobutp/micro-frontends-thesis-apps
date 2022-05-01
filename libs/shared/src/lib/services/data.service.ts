import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from '@micro-frontends-thesis-apps/shared';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private securityService: SecurityService) {}

  get(url: string, params?: any): Observable<Response> {
    const options = {};
    this.setHeaders(options);

    return this.http.get<Response>(url, options).pipe(catchError(this.handleError));
  }

  postWithId(url: string, data: any, params?: any): Observable<Response> {
    return this.doPost(url, data, true, params);
  }

  post(url: string, data: any, params?: any): Observable<Response> {
    return this.doPost(url, data, false, params);
  }

  putWithId(url: string, data: any, params?: any): Observable<Response> {
    return this.doPut(url, data, true, params);
  }

  private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
    const options = {};
    this.setHeaders(options, needId);

    return this.http.post<Response>(url, data, options).pipe(catchError(this.handleError));
  }

  delete(url: string, params?: any) {
    const options = {};
    this.setHeaders(options);

    console.log('data.service deleting');

    this.http.delete(url, options).subscribe((res) => {
      console.log('deleted');
    });
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side network error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error('Backend - ' + `status: ${error.status}, ` + `statusText: ${error.statusText}, ` + `message: ${error.error.message}`);
    }

    // return an observable with a user-facing error message
    return throwError(error || 'server error');
  }

  private doPut(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
    const options = {};
    this.setHeaders(options, needId);

    return this.http.put<Response>(url, data, options).pipe(catchError(this.handleError));
  }

  private setHeaders(options: any, needId?: boolean) {
    if (needId && this.securityService) {
      options['headers'] = new HttpHeaders()
        .append('authorization', 'Bearer ' + this.securityService.GetToken())
        .append('x-requestid', Guid.newGuid());
    } else if (this.securityService) {
      options['headers'] = new HttpHeaders().append('authorization', 'Bearer ' + this.securityService.GetToken());
    }
  }
}
