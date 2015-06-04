define(function(require, exports, module) {
var jQuery = require("$");
var Handlebars = require('handlebars');
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
        	obj.Enode.hide();
        	obj.showPicBox.html(template()).show();
            obj.showPicBox.find('[action-type="tosmall"]').click(function(){obj.tosmall()});
            obj.arginit();//初始化数据
            obj.imgbox = obj.showPicBox.find('[node-type="picShow"] li');
            obj.csNode = obj.initNode();
        	obj.mouseInit(obj.showPicBox.find('[node-type="picShow"]'));
            obj.eventInit();
            obj.directionIndex(obj.index);
        }

        obj.toLeft = function(){
            obj.index = obj.index>0? (obj.index-1) : 0;
            obj.directionIndex(obj.index);
        }
        obj.toRight = function(){
            obj.index = obj.index<obj.len? (obj.index+1) : obj.len;
            obj.directionIndex(obj.index);
        }
        obj.initNode = function(){
            var idxArr = [];
            obj.showPicBox.find('[node-type="picChooseShow"] .item').each(function(index,item){
                var sx = $(item).find('a');
                idxArr.push(sx);
                obj.len = obj.len + sx.length;
            })
            return idxArr;
        }
        obj.eventInit = function(){
            var angle = 0;
            obj.showPicBox.find('[node-type="picChooseShow"]').find('.item a').click(function(){
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
        obj.directionIndex = function(index){
            var _number = Math.floor(index/obj.csNode[obj.xy['x']].length);
            var _idx = (index%obj.csNode[obj.xy['x']].length);
            var _src = $(obj.csNode[_number][_idx]).data("action-src");
            obj.showPicBox.find('[data-ride="carousel"]').carousel(_number);
            $(obj.csNode[obj.xy['x']][obj.xy['y']]).removeClass('select');
            $(obj.csNode[_number][_idx]).addClass('select');
            obj.imgbox.html('<img src="'+_src+'" width="548">');
            obj.showPicBox.find('[action-type="seeBigPic"]').attr('href',_src);
            obj.xy = {x:_number,y:_idx};

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