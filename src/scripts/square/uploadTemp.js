define(function(require, exports, module) {
	return [
		'<div class="upload-img-popover">',
		    '<div class="pop-arrow"></div>',
		   	'<p>共<span node-type="filenum">0</span>张，还能上传<span node-type="yetfilenum">8</span>张</p>',
		   	'<ul class="list-unstyled img-list">',
			    
		      '<li class="doupload">',
		        '<a href="javascript:void(0);" class="fileinput-button"><input id="fileupload" type="file" name="files[]" multiple=""></a>',
		      '</li>',
		   '</ul>',
		'</div>'
	]
})