define(function(require, exports, module) {
var jQuery = require("$");
var Handlebars = require('handlebars');
jQuery.fn.extend({
	rotate: function (deg) {
		// cache dom element
		var $this = jQuery(this);
	
		// make deg random if not set
		if (deg === null) {
			deg = Math.floor(Math.random() * 359);
		}
	
		// rotate dom element
		$this.css({
			'-webkit-transform': 'rotate(' + deg + 'deg)',
			'-moz-transform': 'rotate(' + deg + 'deg)',
			'-ms-transform': 'rotate(' + deg + 'deg)',
			'-o-transform': 'rotate(' + deg + 'deg)',
			'transform': 'rotate(' + deg + 'deg)'
		});
	
		// make chainable
			return $this;
	}
});
(function($){
	var source   = $("#showpic-template").html();
	var template = Handlebars.compile(source);
    $.fn.rotateRight = function(angle) {
        this.rotate(angle==undefined?90:angle); 
    } 
     
    $.fn.rotateLeft = function(angle) { 
        this.rotate(angle==undefined?-90:-angle); 
    } 
	var picShowFn = function(element, useroptions){
        var obj = this;
	    useroptions = (useroptions === undefined) ? {} : useroptions;
	    var options = $.extend({
           element: element
        }, useroptions);
        obj.Enode = $(options.element);
        obj.showPicBox = obj.Enode.siblings('[node-type="showPicBox"]');
        
        obj.arginit = function(){
            obj.Direction = 'smallcursor';
            obj.index = 0;
            obj.len = 0;
            obj.xy = {x:0,y:0};
        }
        obj.init = function() {
        	obj.Enode.find('a').click(function(){obj.toBig()})
        }
        obj.tosmall = function(){
        	obj.showPicBox.empty();
        	obj.Enode.show();
        }
        obj.toBig = function(){
        	obj.arginit();
        	obj.Enode.hide();
        	obj.showPicBox.css("width",obj.showPicBox.width());
        	obj.showPicBox.html(template()).show();
            obj.showPicBox.find('[action-type="tosmall"]').click(function(){obj.tosmall()});   
        	obj.mouseInit(obj.showPicBox.find('[node-type="picShow"]'));
            obj.eventInit();
            obj.directionIndex(obj.index);
        }

        obj.toLeft = function(){
            var index = obj.index>0? (obj.index-1) : 0;
            obj.directionIndex(index);
        }
        obj.toRight = function(){
        	var index = obj.index<obj.len? (obj.index+1) : obj.len;
            obj.directionIndex(index);
        }
        obj.eventInit = function(){
            var angle = 0;
            
            
            if(obj.showPicBox.find('[node-type="mediaShowImg"]').length>0){
            	obj.carouselInit();
            }
            var smlis = obj.showPicBox.find('[node-type="mediaShowImg"] .owl-item a');
            obj.len = smlis.length;
            smlis.click(function(){
                obj.directionIndex($(this).data('index'));
            });
            obj.showPicBox.find('[action-type="trunLeft"]').click(function(){
                angle+=90;
                obj.imgbox.find('img').rotateLeft(angle);
            })
            obj.showPicBox.find('[action-type="trunRight"]').click(function(){
                angle-=90;
                obj.imgbox.find('img').rotateRight(angle);
            })
        }
        obj.carouselInit = function(){
        	var self = this;
        	this.owlpicshow = $('[node-type="mediaShowImg"]');
        	this.owlpicshow.owlCarousel({
				items : 9,
				itemsDesktop : [1199,6],
				itemsDesktopSmall : [990,9],
				pagination:false
			});
			$('[action-type="picshowNext"]').click(function(){
				self.owlpicshow.trigger('owl.next');
			})
			$('[action-type="picshowPrev"]').click(function(){
				self.owlpicshow.trigger('owl.prev');
			})
        }
        obj.directionIndex = function(index,callback){ 
        	var owl = this.owlpicshow.data('owlCarousel');
        	var node_alis = obj.showPicBox.find('[node-type="mediaShowImg"] .owl-item a');
        	var _src = $(node_alis[index]).data("action-src");
        	owl.jumpTo(Math.floor(index/owl.orignalItems));
        	$(node_alis[obj.index]).removeClass("select");
        	$(node_alis[index]).addClass('select');
        	obj.imgbox = obj.showPicBox.find('[node-type="picShow"] li').html('<img src="'+_src+'" width="548">');
            obj.showPicBox.find('[action-type="seeBigPic"]').attr('href',_src);
            obj.index = index;
            callback && typeof(callback) == "function" && callback(index);
        }
        obj.mouseInit = function(el){
        	
        	el.on("mousemove",function(e){
        		if((e.pageX-el.offset().left)<Math.floor(el.width()/3)){
        			el.removeClass('smallcursor').removeClass('rightcursor').addClass('leftcursor');
        			obj.Direction = 'leftcursor';
        		}else if((e.pageX-el.offset().left)>Math.floor(el.width()*2/3)){
        			el.removeClass('leftcursor').removeClass('smallcursor').addClass('rightcursor');
        			obj.Direction = 'rightcursor';
        		}else{ 
        			el.removeClass('leftcursor').removeClass('rightcursor').addClass('smallcursor');
        			obj.Direction = 'smallcursor';
        		//console.log((e.pageX-el.offset().left) + ", " + (e.pageY-el.offset().top))
        		}
        	})
        	el.click(function(e){
                switch(obj.Direction){
                    case 'rightcursor':
                        obj.toRight();
                    break;
                    case 'leftcursor':
                        obj.toLeft();
                    break;
                    default:
                        obj.tosmall();
                    break;
                }
            })
        }
    }
    $.fn.picShow = function(options){
        return this.each(function(){
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('picShow')) return;

            // Pass options and element to the plugin constructer
            var picShow = new picShowFn(this, options);
            picShow.init();
            // Store the plugin object in this element's data
            element.data('picShow', picShow);
        });
    }
    $('[node-type="feed_list_media_prev"]').picShow()
})(jQuery);
})