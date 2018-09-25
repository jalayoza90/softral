
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});
$(document).ready(function() {
   $( '.user-noti' ).hover(
	 function(){
       $('.notifiaction-drop').slideDown(50);
     },
     function(){
       $('.notifiaction-drop').slideUp(50);
     }
   );


   $( '.user-drop' ).hover(
	 function(){
       $('.user-dropdown').slideDown(50);
     },
     function(){
       $('.user-dropdown').slideUp(50);
     }
   );

});

// hero slider //
$(document).ready(function() {
  $("#hero-slider").owlCarousel({
      autoPlay: 4000,
      navigation : false,
	  pagination : true,
	  transitionStyle : "fade",
	   itemsTablet: [600,0],
      	  itemsMobile: [300,0],
      singleItem:true
  });
});



$(document).ready(function() {
// testimonial slider script //
      $("#testi-slider").owlCarousel({
          autoPlay: 7000,
		   navigation : true,
          items : 2,
          itemsDesktop : [1199,2],
          itemsDesktopSmall : [979,1],
		  itemsTablet: [600,1],
      	  itemsMobile: [300,1],
		  afterAction: function(el){
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
      itemsCustom :[
        [0, 1],
		[400, 2],
        [600, 3],
        [700, 4],
        [1000, 5],
        [1200, 5],
        [1400, 5],
        [1600, 5]
		],
      navigation : true
});
});

// sticky header js //
$(window).scroll(function(){
  var sticky = $('body'),
      scroll = $(window).scrollTop();
  if (scroll >= 100) sticky.addClass('header-fixed');
  else sticky.removeClass('header-fixed');
});



$(function () {
$('#dp1').datepicker();
});

/***************bootstrap plus minus scroll********************/

$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
});

/***************bootstrap plus minus scroll********************/