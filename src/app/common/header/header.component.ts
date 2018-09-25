import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../modal/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public bsModalRef: BsModalRef;
  @ViewChild("template") modalElement: any;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  showLogin(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(LoginComponent, {  });
  }
 
}
