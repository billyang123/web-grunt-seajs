define(function(require, exports, module) {
	require("common");
	require('jquery.ui');
	require('scripts/widget/showpicbox/picshow')
	require('jquery.fileupload');
	require('jquery.iframe-transport');
	require('ajaxRails');
	require('owlcarousel');
	require('dropdown');
	require('handlebars-helper');
	var i18n = require("i18n/{locale}");
	//var Handlebars = require('handlebars');
	//var upload_temp = require('./uploadTemp');
	//weibo callback success
	window.Renhe = require('Renhe');
    window.authWeiboCallback = function() {
    	$('body').undelegate("#weiboShareCheckbox","click")
    	$("#weiboShareCheckbox").prop("checked", true);
    	Renhe.alert(i18n.sinaWeibo.bindSuccess);
    }
	var $ = require("$");
	
	var upload_temp = require('./uploadTemp.handlebars');
	var fileNum = 0;
	var topicNum = -1;
	var default_settings = {
		title:"",
		draggable: false,
		resizable: false,
		width:386,
		closeOnEscape: false,
		position: { my: "left top", at: "left bottom",collision:'none'},
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
		self.addTopicEle = self.element.find('[action-type="addtopic"]').find('[type="submit"]');
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
			'[action-type="showWordLimt"] keyup':'topicTextLimit',
			'[action-type="shareTo"] ajax:success':'shareTo',
			'[action-type="removeFile"] click':'removeFile',
			'[action-type="CommitCancel"] click':'CommitCancel',
			'[action-type="addtopic"] ajax:success':'addtopic',
			'[action-type="CommitSend"] ajax:success':'CommitSend',
			'[action-type="like"] ajax:success':'like',
			'[action-type="CommitDel"] ajax:success':'CommitDel',
			'[action-type="networkrefresh"] ajax:success':'networkrefresh',
			'[action-type="networkrefresh"] ajax:send':'beforenetworkrefresh',
			'[action-type="Commit"] focus':'Commitfocus',
			'[action-type="Commit"] keyup':'CommitTextLimit',
			'[action-type="doSignin"] ajax:success':'setcoin',
			'[action-type="moreCommitToggle"] click':'moreCommitToggle',
			'.scignore ajax:success':'ignore',
			'#weiboShareCheckbox click':'weiboShare'
		},
		init:function(){
			var self = this;
			$.each(this.Event,function(index,itemFn){
				var nbs = index.split(' ')
				self.element.delegate(nbs[0],nbs[1],(typeof(itemFn) == 'function')?itemFn:$.proxy(self,itemFn));
			})
		},
		ignore:function(e,d){
			var _li = $(e.target).closest("li");
			_li.remove();
		},
		setcoin:function(e,d){
			var $this = $(e.target);
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
			var el = $(e.target).closest(".media-commont").removeClass("in");
			setTimeout(function(){
				el.remove();
			},200)
		},
		htmlFadeIn:function(apnode,text,type){
			var $res = $(text).hide();
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
				default:
				break;
			}
			var hasIn = node.hasClass('in');
			if(hasIn) {
				node.removeClass('in');
			}
			node.slideDown("fast",function(){
				$(this).addClass('in');
			});
		},
		CommitSend:function(e,text){
			var apnode = $(e.target).closest('[node-type="minArticle"]').find('[node-type="commonts"]');
			this.htmlFadeIn(apnode,text,"appendTo");
			if ($(e.target).is('form')) {
				$(e.target).find('[type="submit"]').attr("disabled","disabled");
		      return $(e.target)[0].reset();
		    }
		},
		addtopic:function(e,text){
			var apnode = $('[node-type="article"]');
			this.htmlFadeIn(apnode,text,"prependTo");
			if ($(e.target).is('form')) {
		      $(e.target)[0].reset();
		    }
			this.uploadReset();
			self.addTopicEle.attr("disabled","disabled");
		},
		uploadReset:function(){
			var self = this;
			if(!self.DGS["upload"]) return;
			self.DGS["upload"].dialog('close');
			$(".js-upload-id").val("");
			fileNum = 0;
			$('[class*="fileid-"]').remove();
			self.DGS["upload"].find('[node-type="filenum"]').html(i18n.upload.text([fileNum,9-fileNum]))
			$('#fileupload').fileupload('option','formData',{
	    		publicationId:""
	    	});
		},
		CommitCancel:function(e){
			var _this = $(e.target);
			_this.closest('.commops').hide().siblings("textarea").val("").attr("rows",1);
		},
		like:function(e){
			var $this = $(e.target);
			numTarget = $this.find("span");
			numTarget.text(numTarget.text() * 1 + 1);
			numTarget.show();
		},
		moreCommitToggle:function(e,text){
			var self = this;
			var $this = $(e.target);
			var $toTarget = $this.closest('[node-type="minArticle"]').find('[node-type="commonts"]');
			if($this.hasClass("icon-double-angle-up")){
				$this.addClass("icon-double-angle-down").removeClass('icon-double-angle-up');
				if($this.data("moreCommit")) {
					$toTarget.find(".fade").removeClass("in").slideToggle();
					return;
				}
			}else{
				$this.addClass("icon-double-angle-up").removeClass('icon-double-angle-down');
				if($this.data("moreCommit")) {
					$toTarget.find(".fade").slideToggle("fast",function(){
						$(this).addClass("in");
					});
					return;
				}
				$.ajax({
					url:$this.attr("data-href"),
					type:"get",
					data:$this.attr("data-params"),
					success:function(text){
						self.htmlFadeIn($toTarget,text,"appendTo");
					}
				})
				$this.data("moreCommit",true);
			}
		},
		removeFile:function(e){
			var self = this;
			var _this = $(e.target);
			$.ajax({
				url:_this.attr('href'),
				type:"POST",
				dataType:"json",
				success:function(d){
					if(d.success){
						
						if(--fileNum < 9){
							$(e.currentTarget).closest('.upload-img-popover').find('[node-type="filenum"]').html(i18n.upload.text([fileNum,9-fileNum]))
							//$(e.currentTarget).closest('.upload-img-popover').find('[node-type="filenum"]').text(fileNum).siblings('[node-type="yetfilenum"]').text(9-fileNum);
							$('a.fileinput-button').show();
						}
						if(topicNum<0 && fileNum<=0){
							self.addTopicEle.attr("disabled","disabled");
						}
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
			    baseClass:"renhe-banner-carousel",
			    stopOnHover : true
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
				pagination:false,
				stopOnHover : true
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
		weiboShare:function(e) {
			var _this = e.target;
			var weiboBind = Boolean($(_this).attr('weiboBind'));
			var sender = $(_this).attr('sender');
			var domainName = $(_this).attr('domainName');
			if(!weiboBind) {
				window.open('/weibo/authCall.shtml?sender=' + sender + '&domainName=' + domainName + '&requestSuffix=.shtml','','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=400,left=400,top=200');
	        	return false;
			}
			return true;
		},
		shareTo:function(e, text) {
			var self = this;
			$(text).dialog({
		      title: i18n.PerfectLight.share,
		      width:446,
		      buttons: [
		        {
		          text: i18n.btn.confirm,
		          click: function() {
		        	$.post("/ajax/shareMessageBoard.html", $(this).serializeArray(), function(html) {
		        		var apnode = $('[node-type="article"]');
		        		self.htmlFadeIn(apnode, html, "prependTo");
		        	});
		            $( this ).dialog( "close" );
		          }
		        },
		        {
		          text: i18n.btn.cancel,
		          click: function() {
		            $( this ).dialog( "close" );
		          }
		        }
		      ],
		      show:{ effect: "fadeIn", duration: 400 },
		      dialogClass: "renhe-dialog"
		    });
		},
		textareaLimit:function(e,addFn){
			var self = this;
			var limitNum = $(e.target).data('limit-num');
			var len = $(e.target).val().length;	
			var btn = $(e.target).closest("form").find('[type="submit"]');

			var target = $('[data-node="'+$(e.target).attr('action-type')+'"]');
			var num = limitNum-len;
			var adds = true;
			if(addFn && typeof(addFn) == "function"){
				adds = addFn(num);
			}
			if((limitNum<len || len<=0) && adds){
				btn.attr("disabled","disabled");
			}else{
				btn.removeAttr("disabled");
			}
			if(target){
				return (num<0 ? target.text(0):target.text(num));
			}
		},
		topicTextLimit:function(e){
			var self = this;
			this.textareaLimit(e,function(num){
				topicNum = num;
				return fileNum<=0;
			});
		},
		CommitTextLimit:function(e){
			var self = this;
			this.textareaLimit(e);
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
				title: i18n.upload.title,
				width:386,
				position: {
					of: els
				},
				create:function( event, ui ) {self.uploadInit(els);},
				close: function( event, ui ) {
					
				}
			})
			//var source   = $('#upload-template').html();
			//var template = Handlebars.compile(source);
			self.DGS["upload"] = $( upload_temp({text:i18n.upload.text([0,9])}) ).dialog(options);
		},
		innerFace:function(event,ui){
			var self = this;
			var _li = $(event.target).find(".emotionslist li");
			_li.unbind( "click" );
			_li.bind("click",function(evt){
				var addfacespic = $(this).find("img").attr("addfacespic");
				self.AddFaceEle.val(self.AddFaceEle.val()+addfacespic);
				self.DGS["face"].dialog('close');
				self.AddFaceEle.closest("form").find('button[type="submit"]').removeAttr("disabled");
			})
		},
		faceOvery:function(els){
			var self = this;
			var addFacePicId = $(els).attr("addFacePicId");
			self.AddFaceEle = $("#"+addFacePicId);
			var options = $.extend(true,default_settings,{
				title: i18n.chooseFace.title,
				width:542,
				position: {
					my: "left top",
					at: "left bottom",
					of: els
				},
				open: function( event, ui ) {
					self.innerFace(event,ui)
				},
				close:function(event, ui){
					self.AddFaceEle.trigger("focus");
				}
			})
			self.DGS["upload"] && self.DGS["upload"].dialog( "isOpen" ) && self.DGS["upload"].dialog('close');
			if(self.faceDGSId){
				//self.DGS["face"].dialog("option", options)
				if(self.faceDGSId == addFacePicId){
					if(self.DGS["face"].dialog( "isOpen" )){
						self.DGS["face"].dialog('close');
					}else{
						self.DGS["face"].dialog('open')
					}
					return;
				}
				self.DGS["face"].dialog("option", options)
				self.DGS["face"].dialog('open');
				self.faceDGSId = addFacePicId;
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
		uploadInit:function(els){
			var self = this;
			var url = '/ajax/uploadMessageBoardImage.html';
		    $('#fileupload').fileupload({
		        url: $(els).attr("href")||url,
		        dataType: 'json',
		        add: function (e, data) {
		        	var str = '';		        	
		        	$.each(data.files,function(index,item){
		        		str+='<li class="file-item fileid-'+fileNum+'"><p class="text-center"><i class="icon-spinner icon-spin"></i></p><p class="text-overflow">'+item.name+'</p></li>';
		        	})
		        	$(this).closest('li').before(str)
		            data.submit();
		        },
		        progressall: function (e, data) {
		            //var progress = parseInt(data.loaded / data.total * 100, 10);
		            //console.log(e, data)
		        }
		    }).on('fileuploaddone',function(e, data){
		    	
		    	
		    	self.addTopicEle.removeAttr("disabled");
		    	$('#fileupload').fileupload('option','formData',{
		    		publicationId:data.result.publicationId
		    	});
		    	$(e.currentTarget).closest('li').siblings('li.fileid-'+fileNum).html('<div><a href="/ajax/deleteMessageBoardImage.html?publicationId='+ data.result.publicationId +'&resourceId='+ data.result.resourceId +'" class="delimg icon-remove" action-type="removeFile"></a><img src="'+data.result.picUrl+'"/></div>')
		    	fileNum +=1;
		    	$(e.currentTarget).closest('.upload-img-popover').find('[node-type="filenum"]').html(i18n.upload.text([fileNum,9-fileNum]))
		    	$(".js-upload-id").val(data.result.publicationId);
		    	
		    	if(fileNum == 9){
		    		$('a.fileinput-button').hide();
		    	}
		    });
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