define(function(require, exports, module) {
	var $ = require("$");
	var i18n = require("i18n/{locale}");
	require('jquery.ui');
	Renhe = {};
	Renhe.alert = function(tips){
		$('<p>'+tips+'</p>').dialog({
	      title: i18n.title.tip,
	      width: 250,
	      buttons: [
	        {
	          text: i18n.btn.confirm,
	          click: function() {
	            $( this ).dialog( "close" );
	          }
	        }
	      ],
	      show:{ effect: "fadeIn", duration: 400 },
	      dialogClass: "renhe-dialog"
	    });
	}
	return Renhe;
})