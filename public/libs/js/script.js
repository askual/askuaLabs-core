$(document).ready(function(){
	"use-strict";
	


	var sliderHeight;
	if(window.innerHeight<665){
		sliderHeight = 310;
	}else{
		sliderHeight = 340
	}

	$('select').material_select();

	$('.button-collapse').sideNav({
		menuWidth: 250
	});
	$('.slider').slider({
		height:200
	});
	  //  // Perfect Scrollbar

	 
	  //   var leftnav = $(".page-topbar").height();  
	  //   var leftnavHeight = window.innerHeight - leftnav;
	  // $('.leftside-navigation').height(leftnavHeight).perfectScrollbar({
	  //   suppressScrollX: true
	  // });
	 


});