import { Component, ComponentRef, OnInit } from '@angular/core';
import { ApisService } from '../../../services/apis.service';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {
  result = false;
  message : String;
  constructor(public apiService: ApisService) {
    
  }
 
  ngOnInit() {
    // no processing needed
  }

  ok(){
    this.apiService.RegisterCallEvent("register");

  }
}
