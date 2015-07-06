define(function(require, exports, module) {
	window.$ = window.jQuery = require("$");
	require("collapse");
	function showScroll(){
		$(window).scroll( function() { 
			var scrollValue=$(window).scrollTop();
			scrollValue > 100 ? $('#backToTop').fadeIn():$('#backToTop').fadeOut();
		} );	
		$('#backToTop').click(function(){
			$("html,body").animate({scrollTop:0},200);	
		});	
	}
	function navbarline(){
    	var cur = $('#J_navbar_nav li.active');
    	$('#J_nav_line').show();
    	if(cur.length>0){
    		var w = cur.width()-20+"px";
        	var l = cur.position().left+10+"px";
        	//var t = cur.position().top+58+"px";
        	$('#J_nav_line').animate({
                "width":w,
                "left":l
            },100,"swing")
    	}
        var tm;
        $('#J_navbar_nav li').hover(function(){
        	$('#J_nav_line').stop();
            $('#J_nav_line').animate({
                "width":$(this).width()-20+"px",
                "left":$(this).position().left+10+"px",
                "top":$(this).position().top+58+"px"
            },100,"swing")
        })
        if(cur.length>0){
	        $("#J_navbar_nav").bind("mouseleave",function(){
	        	$('#J_nav_line').stop();
	        	$('#J_nav_line').animate({
	                "width":w,
	                "left":l
	            },100,"swing")
	        })
	    }
    }
    if($("#J_nav_line").length>0){
         navbarline();
    }
    $(window).resize(function(){
    	if($("#J_nav_line").length>0){
            navbarline();
    	}
	})
	showScroll();
})