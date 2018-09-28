import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../common/modal/login/login.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public bsModalRef: BsModalRef;
  
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    
  }

  showLogin() {
    this.bsModalRef = this.modalService.show(LoginComponent, {  });
  }

}
