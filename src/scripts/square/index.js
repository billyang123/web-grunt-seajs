define(function(require, exports, module) {
	var $ = require("$");
	require('jquery.ui');
	require('scripts/widget/picshow')
	require('jquery.fileupload');
	require('jquery.iframe-transport');
	require("carousel");
	require('ajaxRails');
	var Handlebars = require('handlebars')
	var upload_temp = require('./uploadTemp');
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
		self.init();
	}
	renheWidget.prototype = {
		Event:{
			'.js-emotion click':function(e){
				$(e.target).sinaEmotion();
	    		event.stopPropagation();
			},
			'[action-type="willcommit"] click':function(e){
				$(e.target).closest('.min-article').find('textarea').focus();
			},
			'[action-type="willSubCommit"] click':function(e){
				$(e.target).closest('.min-article').find('textarea').val('\u56DE\u590D@'+$(e.target).data('atmsgname')+':');
			},
			'[action-type="showUploadProver"] click':'showUploadProver',
			'[action-type="addMessageBoardFacePic"] click':'addMessageBoardFacePic',
			'[action-type="showWordLimt"] keyup':'textareaLimit',
			'[action-type="transmitTo"] click':'transmitTo',
			'[action-type="removeFile"] click':'removeFile',
			'#weiboShareCheckbox click':'weiboShare'
		},
		init:function(){
			var self = this;
			$.each(this.Event,function(index,itemFn){
				var nbs = index.split(' ')
				self.element.delegate(nbs[0],nbs[1],(typeof(itemFn) == 'function')?itemFn:$.proxy(self,itemFn));
			})
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
		      title: '\u5206\u4EAB\u7559\u8A00',
		      width:446,
		      buttons: [
		        {
		          text: "\u5206\u4EAB",
		          click: function() {
		            $( this ).dialog( "close" );
		          }
		        },
		        {
		          text: "\u53D6\u6D88",
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
				title: "\u4e0a\u4f20\u56fe\u7247",
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
			self.DGS["upload"] = $( upload_temp.join('') ).dialog(options);
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
				title: '\u5e38\u7528\u8868\u60c5',
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