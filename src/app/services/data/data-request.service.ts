import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';
import { HttpOptions } from '../../interfaces/httpOptions.interface';
import { mergeMap } from 'rxjs/operators';
import * as _ from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class DataService {
/**
 * Contains base Url for api end points
 */
  baseUrl: string;

  constructor(
    private http: HttpClient) {
  }

/**
 * for preparing headers
 */
  private getHeader(headers?: HttpOptions['headers']): HttpOptions['headers'] {
    const default_headers = {
      Accept: 'application/json',
     // Authorization: 'Bearer xxxx',
    };

    return default_headers;
  }

/**
 * for making post api calls
 * @param RequestParam param
 */
  post(requestParam): Observable<any> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param
    };

    return this.http.post(requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }


/**
 * for making get api calls
 *
 * @param requestParam param
 */
  get(requestParam): Observable<any> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? requestParam.header : this.getHeader(),
      params: requestParam.param
    };

    return this.http.get(requestParam.url, httpOptions).pipe(
      mergeMap((data: any) => {

        return observableOf(data);
      }));

  }

/**
* for making post api calls
* @param RequestParam param
*/
  patch(requestParam): Observable<any> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param
    };
    return this.http.patch(requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }

}


