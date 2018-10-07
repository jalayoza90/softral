import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../common/modal/login/login.component';
import { ApisService } from '../services/apis.service';
import { RegisterService } from './signup.service';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public thisYear;
  public user: FormGroup;
  public bsModalRef: BsModalRef;
  fileToUpload: File = null;

  constructor(private fb: FormBuilder, public apiService: ApisService, private modalService: BsModalService, public registerService: RegisterService) { }

  ngOnInit() {
    let dt = new Date();
    this.thisYear = dt.getFullYear();
    this.user = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      usertype: ['', Validators.required],
      termandc: ['', Validators.required],
    });
  }

  showLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent, {});
  }
  handleFileInput(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);
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
  onSubmit() {
    let user = {};
    
    user["username"] = this.user.get("username").value;
    user["email"] = this.user.get("email").value;
    user["image"] = this.fileToUpload;
    user["password"] =  this.user.get("password").value,
    user["usertype"] = this.user.get("usertype").value,
    user["termandc"] =  this.user.get("termandc").value
    
      this.registerService.register(user).subscribe(succ => {
        console.log("succ",succ);
      }, err=>{
        this.apiService.toasterMessage("error", JSON.stringify(err), "Error in Signup");
      });
    if (this.user.valid) {
      console.log("test",user);
    }
  }
  

}
