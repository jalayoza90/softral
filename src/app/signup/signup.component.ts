import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../common/modal/login/login.component';
import { ApisService } from '../services/apis.service';
import { RegisterService } from './signup.service';

import { MyModalComponent } from '../common/modal/my-modal/my-modal.component';  // your custom component path
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { ignoreElements } from 'rxjs/operators';



declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public thisYear;
  public user: FormGroup;
  public user2: FormGroup;
  user1Data;
  public bsModalRef: BsModalRef;
  fileToUpload: File = null;
  citiesList = [];
  citiesShowList = [];
  stateList = [];
  step = 1;
  constructor(
    private viewRef: ViewContainerRef, private fb: FormBuilder, public apiService: ApisService, private modalService: BsModalService, public registerService: RegisterService, public localStorage: LocalStorageService) { }

  ngOnInit() {
    let dt = new Date();
    this.thisYear = dt.getFullYear();
    this.user = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      confemail: ['', Validators.required],
      password: ['', Validators.required],
      confpassword: ['', Validators.required],
      usertype: ['', Validators.required],
      termandc: ['', Validators.required],
    });
    this.user2 = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      title: [''],
      businessaddress: [''],
      alternet_phone: [''],
      alternate_email: [''],
      businessname: ['']
    });

    this.cities();
    this.states();

    if (this.localStorage.getItem("user_id")) {
      this.step = 2;
    }
    if (this.localStorage.getItem("userdata")) {
      this.user1Data = JSON.parse(this.localStorage.getItem("userdata"));
    }
    this.apiService.registerCall$.forEach(event => {
      if (event == 'register') {
        this.bsModalRef.hide();
        this.step = 2;
      }
    });
    
  }
  cities() {
    this.registerService.cities({}).subscribe(succ => {
      this.citiesList = succ;
    });
  }
  states() {
    this.registerService.states({}).subscribe(succ => {
      this.stateList = succ;
    });
  }
  calledState(e) {
    this.citiesShowList = [];
    for (let i = 0; i < this.citiesList.length; i++) {
      if (this.citiesList[i].state == e) {
        this.citiesShowList.push(this.citiesList[i]);
      }
    }
  }
  openpopup() {
    this.bsModalRef = this.modalService.show(MyModalComponent, {});
  }

  showLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent, {});
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  registerCheck2() {
    $('#signupform2').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      rules: {
        firstname: {
          required: true
        },

        lastname: {
          required: true
        },

      },
      messages: {
        firstname: {
          required: "First name is required1."
        },
        lastname: {
          required: "Last name is required."
        }
      },
      invalidHandler: function (event, validator) { //display error alert on form submit   
        $('.alert-danger', $('.login-form')).show();
      },
      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },
      success: function (element) {
        $(element)
          .closest('.form-group').removeClass('has-error');
        //label.remove();
      },
      errorPlacement: function (error, element) {
        error.insertAfter(element.closest('.input-icon'));
      },
      submitHandler: function (form) {
        $(form).submit();

      }

    });
  }
  registerCheck() {

    $('#signupform1').validate({
      errorElement: 'span', //default input error message container
      errorClass: 'help-block', // default input error message class
      focusInvalid: false, // do not focus the last invalid input
      rules: {
        username: {
          required: true
        },

        password: {
          required: true
        },

      },
      messages: {
        username: {
          required: "Username is required1."
        },
        password: {
          required: "Password is required."
        }
      },
      invalidHandler: function (event, validator) { //display error alert on form submit   
        $('.alert-danger', $('.login-form')).show();
      },
      highlight: function (element) { // hightlight error inputs
        $(element)
          .closest('.form-group').addClass('has-error'); // set error class to the control group
      },
      success: function (element) {
        $(element)
          .closest('.form-group').removeClass('has-error');
        //label.remove();
      },
      errorPlacement: function (error, element) {
        error.insertAfter(element.closest('.input-icon'));
      },
      submitHandler: function (form) {
        $(form).submit();

      }

    });
  }
  checkPasswords() { // here we have the 'passwords' group
    let validate = true;

    if (this.user.get("password").value !== this.user.get("confpassword").value) {
      validate = false;
      this.apiService.toasterMessage("error", "Password did not match", "Password fail!");
    } else if (this.user.get("email").value !== this.user.get("confemail").value) {
      validate = false;
      this.apiService.toasterMessage("error", "Email address did not match", "Password fail!");
    } else {
      validate = true;
    }
    return validate;
  }

  onSubmit() {
    let user = {};
    let succ = this.checkPasswords();
    if (this.user.valid) {
      if (succ) {
        user["username"] = this.user.get("username").value;
        user["email"] = this.user.get("email").value;
        // user["image"] = this.fileToUpload;
        user["password"] = this.user.get("password").value,
        user["usertype"] = this.user.get("usertype").value,
        user["termandc"] = this.user.get("termandc").value

        this.registerService.register(user).subscribe(succ => {
          if (succ && succ.result && succ.result == "success") {
            this.openpopup();
            
            this.user1Data = user;
            this.localStorage.setItem("userdata", JSON.stringify(user));
            this.localStorage.setItem("user_id", succ.user_id);
          }
        }, err => {
          this.apiService.toasterMessage("error", JSON.stringify(err), "Error in Signup");
        });
      }
    }
  }

  onSubmit2() {
    let user2 = {};
    if (this.user2.valid) {
      

        user2["firstname"] = this.user2.get("firstname").value;
        user2["lastname"] = this.user2.get("lastname").value;
        user2["image"] = this.fileToUpload;
        user2["state"] = this.user2.get("state").value;
        user2["city"] = this.user2.get("city").value;
        user2["phone"] = this.user2.get("phone").value;
        user2["id"] = this.localStorage.getItem("user_id");

        user2["title"] = this.user2.get("title").value;
        user2["businessaddress"] = this.user2.get("businessaddress").value;
        user2["alternet_phone"] = this.user2.get("alternet_phone").value;
        user2["alternate_email"] = this.user2.get("alternate_email").value;
        user2["businessname"] = this.user2.get("businessname").value;

        this.registerService.register2(user2).subscribe(succ => {
          if (succ && succ.result && succ.result == "success") {
            this.openpopup();
            this.apiService.toasterMessage("success", "Signup successfully", "Signup success");
            this.localStorage.removeItem("user_id");
            this.localStorage.removeItem("userdata");
          }
        }, err => {
          this.apiService.toasterMessage("error", JSON.stringify(err), "Error in Signup");
        });
      
    } else {
      this.apiService.toasterMessage("error", JSON.stringify(this.user2.valid), "Error in Signup");
    }
  }
}
