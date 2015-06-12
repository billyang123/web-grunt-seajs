define(function(require, exports, module) {
	var $ = require("$");
	require('jquery.ui');
	require('scripts/widget/picshow')
	require('jquery.fileupload');
	require('jquery.iframe-transport');
	require('ajaxRails');
	require('owlcarousel');
	require('dropdown');
	//var Handlebars = require('handlebars');
	//var upload_temp = require('./uploadTemp');
	var upload_temp = require('./uploadTemp.handlebars');
	var fileNum = 0;
	var default_settings = {
		title:"",
		draggable: false,
		resizable: false,
		width:386,
		closeOnEscape: false,
		position: { my: "center+100 top+8", at: "center bottom",collision:'none'},
		dialogClass: "renhe-dialog-popover",
		show:{ effect: "fadeIn", duration: 400 }
	}
	var renheWidget = function(element){
		var self = this;
		self.cur_Dg_element=false,
		self.cur_Dg_type=false
		self.faceDGSId = false;
		self.DGS = {};
		self.element = $(element);
		self.carouselInit();
		self.init();
	}
	renheWidget.prototype = {
		Event:{
			'button[type!="submit"] click':function(e){
				 e.preventDefault();
			},
			'[action-type="willcommit"] click':'willcommit',
			'[action-type="willSubCommit"] click':'willSubCommit',
			'[action-type="showUploadProver"] click':'showUploadProver',
			'[action-type="addMessageBoardFacePic"] click':'addMessageBoardFacePic',
			'[action-type="showWordLimt"] keyup':'textareaLimit',
			'[action-type="transmitTo"] click':'transmitTo',
			'[action-type="removeFile"] click':'removeFile',
			'[action-type="CommitCancel"] click':'CommitCancel',
			'[action-type="addtopic"] ajax:success':'addtopic',
			'[action-type="CommitSend"] ajax:success':'CommitSend',
			'[action-type="CommitDel"] ajax:success':'CommitDel',
			'[action-type="networkrefresh"] ajax:success':'networkrefresh',
			'[action-type="networkrefresh"] ajax:send':'beforenetworkrefresh',
			'[action-type="Commit"] focus':'Commitfocus',
			'[action-type="doSignin"] ajax:success':'setcoin',
			'[action-type="commitAngletoggle"] click':'commitAngletoggle',
			'#weiboShareCheckbox click':'weiboShare'
		},
		init:function(){
			var self = this;
			$.each(this.Event,function(index,itemFn){
				var nbs = index.split(' ')
				self.element.delegate(nbs[0],nbs[1],(typeof(itemFn) == 'function')?itemFn:$.proxy(self,itemFn));
			})
		},
		commitAngletoggle:function(e){
			$(e.target).toggle(
				function () {
				   $(this).addClass("icon-double-angle-down").removeClass('icon-double-angle-up');
				},
				function () {
				   $(this).removeClass("icon-double-angle-up").addClass('icon-double-angle-down');
				}
			);
		},
		setcoin:function(e,d){
			var numnd = $('[node-type="coinNum"]');
			var num = parseInt(numnd.attr("data-num"),10)+1;
			numnd.attr("data-num",num).text(num);
		},
		willSubCommit:function(e){
			$(e.target).closest('.min-article').find('textarea').val('\u56DE\u590D@'+$(e.target).data('atmsgname')+':').focus();
		},
		willcommit:function(e){
			$(e.target).closest('.min-article').find('textarea').focus();
		},
		Commitfocus:function(e){
			$(e.target).attr('rows',3).siblings(".commops").show();
		},
		beforenetworkrefresh:function(e){
			$(e.target).find('.icon-refresh').addClass("icon-spin")
		},
		networkrefresh:function(e,text){
			var apnode = $(e.target).find('.icon-refresh').removeClass("icon-spin").closest(".search-network").find("ul");
			this.htmlFadeIn(apnode,text,"html")
		},
		CommitDel:function(e,text){
			$(e.target).closest(".media-commont").remove();
		},
		htmlFadeIn:function(apnode,text,type){
			var $res = $(text);
			var node;
			switch(type){
				case 'prependTo':
					node = $res.prependTo(apnode);
				break;
				case 'appendTo':
					node = $res.appendTo(apnode);
				break;
				case 'html':
					node = $res;
					apnode.html($res)
				break;
			}
			var hasIn = node.hasClass('in');
			if(hasIn) node.removeClass('in');
			setTimeout(function(){
				if(hasIn) node.addClass('in');
			},300)
		},
		CommitSend:function(e,text){
			var apnode = $(e.target).closest('[node-type="minArticle"]').find('[node-type="commonts"]');
			this.htmlFadeIn(apnode,text,"appendTo")
		},
		addtopic:function(e,text){
			var apnode = $('[node-type="article"]');
			this.htmlFadeIn(apnode,text,"prependTo")
		},
		CommitCancel:function(e){
			var _this = $(e.target);
			_this.closest('.commops').hide().siblings("textarea").attr("rows",1);
		},
		removeFile:function(e){
			var _this = $(e.target);
			$.ajax({
				url:_this.attr('href'),
				type:"POST",
				dataType:"json",
				success:function(d){
					if(d.success){
						_this.closest('li').remove();
					}
				}
			});
			return false;
		},
		carouselInit:function(){
			var owlcs = $("#carousel-rhhistry");
			$("#carousel-rhbanner").owlCarousel({
				autoPlay: 3000,
				navigation : true, // Show next and prev buttons
			    slideSpeed : 300,
			    paginationSpeed : 400,
			    singleItem:true,
			    navigation:false,
			    baseClass:"renhe-banner-carousel"
			      // "singleItem:true" is a shortcut for:
			  // items : 1, 
			  // itemsDesktop : false,
			  // itemsDesktopSmall : false,
			  // itemsTablet: false,
			  // itemsMobile : false
			 
			});
			owlcs.owlCarousel({	 
				autoPlay: 3000, //Set AutoPlay to 3 seconds
				items : 4,
				itemsDesktop : [1199,3],
				itemsDesktopSmall : [979,3],
				pagination:false
			});
			$('[action-type="histryNext"]').click(function(){
				owlcs.trigger('owl.next');
			})
			$('[action-type="histryPrev"]').click(function(){
				owlcs.trigger('owl.prev');
			})
		},
		qqWeiboShare:function(e){
			var _this = e.target;
			var syncQqWeiboLivingRoom = $(_this).prop('checked');
			jQuery.post('/ajax/changeSyncQqWeiboLivingRoom.html', {syncQqWeiboLivingRoom: syncQqWeiboLivingRoom});
		},
		weiboShare:function(){
			window.open('/weibo/authCall.html?sender=6783482&syncLivingRoom=true','','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=400,left=400,top=200');
	    	  return false;
		},
		transmitTo:function(e){
			var source   = $('#transmit-template').html();
			var transmitTemplate = Handlebars.compile(source);
			$( transmitTemplate() ).dialog({
		      title: "分享留言",
		      width:446,
		      buttons: [
		        {
		          text: "分享",
		          click: function() {
		            $( this ).dialog( "close" );
		          }
		        },
		        {
		          text: "取消",
		          click: function() {
		            $( this ).dialog( "close" );
		          }
		        }
		      ],
		      show:{ effect: "fadeIn", duration: 400 },
		      dialogClass: "renhe-dialog"
		    });
		},
		textareaLimit:function(e){
			return $('[data-node="'+$(e.target).attr('action-type')+'"]').text($(e.target).data('limit-num')-$(e.target).val().length);
		},
		uploadOvery:function(els){
			var self = this;
			self.DGS["face"] && self.DGS["face"].dialog( "isOpen" ) && self.DGS["face"].dialog('close');
			if(self.DGS["upload"]){
				self.DGS["upload"].dialog( "isOpen" ) ?
				self.DGS["upload"].dialog('close') : self.DGS["upload"].dialog('open');
				return;
			}
			var options = $.extend(true,default_settings,{
				title: "上传图片",
				width:386,
				position: {
					of: els
				},
				create:function( event, ui ) {self.uploadInit();},
				close: function( event, ui ) {
					fileNum = 0;
					$('[class*="fileid-"]').remove();
				}
			})
			//var source   = $('#upload-template').html();
			//var template = Handlebars.compile(source);
			self.DGS["upload"] = $( upload_temp() ).dialog(options);
		},
		innerFace:function(AddFaceEle,event,ui){
			var self = this;
			var _li = $(event.target).find(".emotionslist li");
			_li.unbind( "click" );
			_li.bind("click",function(evt){
				var addfacespic = $(this).find("img").attr("addfacespic");
				AddFaceEle.val(AddFaceEle.val()+addfacespic);
				self.DGS["face"].dialog('close');
			})
		},
		faceOvery:function(els){
			var self = this;
			var addFacePicId = $(els).attr("addFacePicId");
			var AddFaceEle = $("#"+addFacePicId);
			var options = $.extend(true,default_settings,{
				title: "常用表情",
				width:542,
				position: {
					of: els
				},
				open: function( event, ui ) {
					self.innerFace(AddFaceEle,event,ui)
				}
			})
			self.DGS["upload"] && self.DGS["upload"].dialog( "isOpen" ) && self.DGS["upload"].dialog('close');
			if(self.faceDGSId){
				if(addFacePicId==self.faceDGSId){
					self.DGS["face"].dialog( "isOpen" ) ?
					self.DGS["face"].dialog('close') : self.DGS["face"].dialog('open');
				}else{
					self.DGS["face"].dialog('close');
					self.DGS["face"].dialog("option", options)
					self.DGS["face"].dialog('open');
					self.faceDGSId = addFacePicId;
				}
	
				return;
			}
			self.faceDGSId = addFacePicId;
			$.ajax({
				url:$(els).attr("href"),
				dataType:"text",
				success:function(text){
					self.DGS["face"]= $( text ).dialog(options);
				}
			})
		},
		uploadInit:function(){
			var url = '/uploadfile.htm';
		    $('#fileupload').fileupload({
		        url: url,
		        dataType: 'json',
		        add: function (e, data) {
		        	console.log(e, data)
		        	var str = '';
		        	
		        	$.each(data.files,function(index,item){
		        		fileNum +=1;
		        		str+='<li class="fileid-'+fileNum+'"><p class="text-center"><i class="icon-spinner icon-spin"></i></p><p class="text-overflow">'+item.name+'</p></li>';
		        		
		        	})
		        	$(this).closest('li').before(str)
		            //data.context = $('<p/>').text('Uploading...').appendTo(document.body);
		            data.submit();
		        },
		        progressall: function (e, data) {
		            var progress = parseInt(data.loaded / data.total * 100, 10);
		            console.log(e, data)
		        }
		    }).on('fileuploaddone',function(e, data){
		    	$(e.currentTarget).closest('li').siblings('li.fileid-'+fileNum).html('<div><a href="/deletefile.htm" class="delimg icon-remove" action-type="removeFile"></a><img src="'+data.result.fileurl+'"/></div>')
		    	$(e.currentTarget).closest('.upload-img-popover').find('[node-type="filenum"]').text(fileNum).siblings('[node-type="yetfilenum"]').text(8-fileNum);
		    })
		},
		addMessageBoardFacePic:function(e){
			this.faceOvery(e.target);
			return false;
		},
		showUploadProver:function(e){
			this.uploadOvery(e.target);
		}
	
	}
	new renheWidget('body');
})