import { Component, OnInit } from '@angular/core';
declare var $ :any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public images = [
    "../assets/uploads/slider/1504305222Softral-Photo.jpg",
    "../assets/uploads/slider/1500493287slider-3.jpg"

  ]
  constructor() { }

  ngOnInit() {
    this.forJqueryHomeBanner();
  }
  forJqueryHomeBanner(){
    $(window).load(function()
    {
      var a=$(window).height();
      $("#hero-slider .owl-item .item > img").css({height:a});
      $(window).resize(function()
        {
          var b=$(window).height();
          $("#hero-slider .owl-item .item > img").css({height:b})
        })
    });
  }
}
