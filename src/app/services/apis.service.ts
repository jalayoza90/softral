import { Injectable } from '@angular/core';
// import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage/local-storage.service';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
// Import RxJs required methods
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApisService {
  API_URL: String;
  SITE_URL: String;
  token: any;

  // for internal emit
  private _loginCall = new Subject<any>();
  private _loginCheck = new Subject<any>();

  private _registerCall = new Subject<any>();
  

  constructor(public localStorageService: LocalStorageService, private httpClient: HttpClient, private router: Router, private toastr: ToastrService) {
    this.API_URL = environment.apiUrl;
    this.SITE_URL = environment.SITE_URL;
  }

  getHeader(headerOptions, qparams = {}, doNotSendAuthorizationParam) {
    let headerParams = {};
    if (doNotSendAuthorizationParam !== true && this.localStorageService.getSessionId()) {
        //send authorization param
        headerParams['x-auth-token'] = this.localStorageService.getSessionId();
    }
    headerParams['Access-Control-Allow-Origin'] = "*";
    headerParams["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, DELETE";
    headerParams["Access-Control-Request-Headers"] = "*";
    headerParams["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers,x-auth-token";
    if (headerOptions) {
        headerParams = { ...headerParams, ...headerOptions }
    }
    
    

    let params: HttpParams = new HttpParams();
    for (let key in qparams) {
        params.set(key, qparams[key]);
    }
    let headers = new HttpHeaders(headerParams);
    return headers;
}

get(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = false) {
  params["Content-Type"]  = "application/json";
  let httpOptions = this.getHeader(headerOptions, params, doNotSendAuthorizationParam);
    return this.httpClient.get<any>(this.API_URL + url, { params: params, headers: httpOptions }).pipe(map(data => {
        if (data) {
            return data
        } else {
            return []
        }
    }), tap(),
        catchError(this.handleError)
    )
}

post(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = false) {
    let httpOptions = this.getHeader(headerOptions, params, doNotSendAuthorizationParam);
    
    return this.httpClient.post<any>(this.API_URL + url, params, { headers: httpOptions }).pipe(map(data => {
        if (data) {
            return data
        } else {
            return []
        }
    }), tap(), catchError(this.handleError))
}

put(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = false) {
    let httpOptions = this.getHeader(headerOptions, params, doNotSendAuthorizationParam);
    return this.httpClient.put<any>(this.API_URL + url, params, { headers: httpOptions }).pipe(map(data => {
        if (data) {
            return data
        } else {
            return []
        }
    }), tap(), catchError(this.handleError))
}

delete(url, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = false) {
    let httpOptions = this.getHeader(headerOptions, null, doNotSendAuthorizationParam);
    return this.httpClient.delete<any>(this.API_URL + url, { headers: httpOptions })
        .pipe(map(data => {
            if (data) {
                return data
            } else {
                return []
            }
        }), tap(), catchError(this.handleError))
}

public handleError(err: HttpErrorResponse) {
    // return an observable with a user-facing error message
    
    // console.log(error.message);
    return throwError(err.error);
};


  // for internel emittng
  LoginCallEvent(event) {
    this._loginCall.next(event);
  }

  get loginCall$() {
    return this._loginCall.asObservable();
  }

  RegisterCallEvent(event) {
    this._registerCall.next(event);
  }

  get registerCall$() {
    return this._registerCall.asObservable();
  }

  

  LoggedInEvent(event) {
    this._loginCheck.next(event);
  }

  get logggedIn$() {
    return this._loginCheck.asObservable();
  }

  public toasterMessage(method, message, subject) {
    if (method == 'success') {
      this.toastr.success(message, subject);
    }
    if(method == "error") {
      this.toastr.error(message, subject);
    }
  }
}
