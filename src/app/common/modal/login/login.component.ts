import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApisService } from '../../../services/apis.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  result = false;
  constructor(private fb: FormBuilder, public apiService: ApisService, public loginService: LoginService) { }

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
        console.log("succ", succ);
        if(succ) {
          localStorage.setItem("token", "xyz");
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
