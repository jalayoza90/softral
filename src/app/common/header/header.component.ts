import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../modal/login/login.component';
import { ApisService } from '../../services/apis.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public isLogedIn = false;
  public userDetail;
  constructor(private modalService: BsModalService, public apiService: ApisService, public localStorage: LocalStorageService) { }

  ngOnInit() {
    if(this.localStorage.getLoginInfo()) {
      this.isLogedIn = true;
    }
    this.apiService.loginCall$.forEach(event => {
      if (event == 'loggedin') {
        this.isLogedIn = true;
      }
    });
    this.apiService.logggedIn$.forEach(event => {
      if (event == 'loggedin') {
        this.bsModalRef.hide();
        $(".cd-nav-trigger").click();
        // cd-nav-trigger
        this.apiService.toasterMessage("success", 'You are successfully Sign In!', 'Logged In!')
        this.userDetail = this.localStorage.getUserDetails();
      }
    });
    if(this.localStorage.getUserDetails()) {
      this.userDetail = this.localStorage.getUserDetails();
    }
  }
  showLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent, {  });
    $(".cd-nav-trigger").click();
  }
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("users");
    this.isLogedIn = false;
    $(".cd-nav-trigger").click();
    this.apiService.toasterMessage("success", 'You are successfully Logged Out!', 'Logged Out!')
  }
}
