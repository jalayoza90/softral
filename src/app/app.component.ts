import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from './services/apis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'softral';
  loader = 'hide';
  constructor(public apiService: ApisService, private router: Router){
    apiService.loaderCall$.forEach(event => {
      if (event == 'show') {
        this.loader = '';
      } else {
        this.loader = 'hide';
      }
    });
  }
}
