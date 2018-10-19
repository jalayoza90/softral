import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApisService } from '../../../services/apis.service';
import { LoginService } from './login.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  result = false;
  constructor(private fb: FormBuilder, public apiService: ApisService, public loginService: LoginService, public localStorage: LocalStorageService) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  login() {
    if (this.user.valid) {
      let user = {};
      user['email'] = this.user.get('email').value;
      user['password'] = this.user.get('password').value;
      this.loginService.login(user).subscribe(succ => {
        if(succ) {
          this.localStorage.setUserDetails(succ.users);
          this.localStorage.setLoginInfo(succ.access_token);
          this.apiService.LoginCallEvent("loggedin");
          this.result = true;
          this.apiService.LoggedInEvent("loggedin");
        } else {
          this.apiService.toasterMessage("error", JSON.stringify(succ), "Error in login");
        }
      })
      
    }
  }
}
