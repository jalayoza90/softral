import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApisService } from '../../../services/apis.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {
  public user : FormGroup;
  result =false;
  constructor(private fb: FormBuilder, public apiService: ApisService) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }
  login(){
    let user = new FormData();
    user.append('email', this.user.get('email').value);
    user.append('password', this.user.get('password').value);
    localStorage.setItem("token","xyz");
    this.apiService.LoginCallEvent("loggedin");
    this.result = true;
    this.apiService.LoggedInEvent("loggedin");
  }
}
