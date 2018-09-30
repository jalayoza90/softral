import { Component, OnInit } from '@angular/core';
declare var $: any;

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
    this.forJqueryHomeBanner().then(succ => {
      this.resizeScreent();
    })
  }
  forJqueryHomeBanner() {
    return new Promise((resolve, reject) => {
      $("#hero-slider").owlCarousel({
        autoPlay: 4000,
        navigation: false,
        pagination: true,
        transitionStyle: "fade",
        itemsTablet: [600, 0],
        itemsMobile: [300, 0],
        singleItem: true
      });
      $("#testi-slider").owlCarousel({
        autoPlay: 7000,
        navigation: true,
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [600, 1],
        itemsMobile: [300, 1],
        afterAction: function (el) {
          //remove class active
          this
            .$owlItems
            .removeClass('active')

          //add class active
          this
            .$owlItems //owl internal $ object containing items
            .eq(this.currentItem + 1)
            .addClass('active')
        }
      });

      // clints slider script //
      var owl = $("#clints-slider");
      owl.owlCarousel({
        itemsCustom: [
          [0, 1],
          [400, 2],
          [600, 3],
          [700, 4],
          [1000, 5],
          [1200, 5],
          [1400, 5],
          [1600, 5]
        ],
        navigation: true
      });
      resolve(true);
    });


  }

  resizeScreent() {
    $(window).load(function () {
      var a = $(window).height();
      $("#hero-slider .owl-item .item > img").css({ height: a });
      $(window).resize(function () {
        var b = $(window).height();
        $("#hero-slider .owl-item .item > img").css({ height: b })
      })
    });
  }

}
