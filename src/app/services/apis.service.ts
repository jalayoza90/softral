import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
// Import RxJs required methods
import { Subject, Observable  } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApisService {
  API_URL: String;
  SITE_URL: String;
  token: any;

  // for internal emit
  private _loginCall = new Subject<any>();
  private _loginCheck = new Subject<any>();

  constructor(private http: Http, private router: Router, private toastr: ToastrService) {
      this.API_URL = environment.apiUrl;
      this.SITE_URL = environment.SITE_URL;
  }

  /** APIs will be here **/
  login(data, onSuccess, api = "user/adminlogin") {
    // console.log(data);
    this.postObserver(api, data).subscribe(res => {
      // console.log(res);
      if(res['secret_token']) {
        localStorage.setItem('secret_token',res['secret_token']);
        localStorage.setItem('id',res['user_id']);
      }
      onSuccess(this.successManage(res));
    }, err => {
      onSuccess(this.errorManage(err));
    });
  }

  isLoggedIn(callback) {
    let getLogedInUsersId = localStorage.getItem('id');
    let getLogedInToken = localStorage.getItem('secret_token');
    if(getLogedInUsersId && getLogedInToken) {
        callback(true);
    } else {
        callback(false);
    }
  }

  redirectToDashboard() {
    this.router.navigateByUrl('/dashboard/main');
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

  /** Observer functions **/
  postObserver(apiurl, data): Observable<Object> {
      return this.postApiResponse(apiurl, data);
  }
  getObserver(apiurl,data): Observable<Object> {
      return this.getApiResponse(apiurl+'/'+data);
  }

  /** Responce functions **/
  postApiResponse(url: string, data: Object): Observable<Object> {
      let options = this.getHeaders();
      return this.http.post(this.API_URL + url, data, options).map(res => res.json());
  }
  getApiResponse(url: string): Observable<Object> {
      let options = this.getHeaders();
      return this.http.get(this.API_URL + url, options).map(res => res.json());
      // .catch((error: any) => Observable.throw(JSON.stringify(error) || 'Server error'));
  }
  getHeaders() {
      this.token = localStorage.getItem('secret_token');
      let headers = new Headers();
      headers.append('x-auth-token', this.token);
      let options = new RequestOptions({ headers: headers });
      return options;
  }

  // Error Manager
  errorManage(err) {
    if(err.status == 500) {
      err.message = err.statusText;
    } else {
      err.message = err.statusText;
    }
    return err;
  }

  // Success Manager
  successManage(suss) {
    return suss;
  }


  // for internel emittng
  LoginCallEvent(event) {
    this._loginCall.next(event);
  }

  get loginCall$ () {
    return this._loginCall.asObservable();
  }

  LoggedInEvent(event) {
    this._loginCheck.next(event);
  }

  get logggedIn$ () {
    return this._loginCheck.asObservable();
  }

  toasterMessage (method, message, subject) {
    if(method == 'success') {
      this.toastr.success(message, subject);
    }
  }
}
