import { Injectable, Inject } from '@angular/core';

import { LocalStorageEnums } from './localStorageEnums'
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  executeFunction: any;

  clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  getUserDetails() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(LocalStorageEnums.userinfo));
    }
  }

  setUserDetails(userInfo) {
    return localStorage.setItem(LocalStorageEnums.userinfo, JSON.stringify(userInfo));
  }

  setLoginInfo(loginInfo) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.setItem(LocalStorageEnums.loginInfo, JSON.stringify(loginInfo));
    }
  }
  setUserName(loginInfo) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.setItem(LocalStorageEnums.firstName, JSON.stringify(loginInfo));
    }
  }
  getUserName() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(LocalStorageEnums.firstName);
    }
  }
  getLoginInfo() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(LocalStorageEnums.loginInfo));
    }
  }

  getSessionId() {
    if (isPlatformBrowser(this.platformId)) {
      let userDetails = this.getUserDetails();
      if (userDetails && userDetails.token) {
        return userDetails.token;
      }
    }
  }
  getItem(key) {
    if (isPlatformBrowser(this.platformId)) {
      // here you can access window
      return localStorage.getItem(key);
    }
  }
  setItem(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.setItem(key, value);
    }
  }
  removeItem(key) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.removeItem(key);
    }
  }
}
