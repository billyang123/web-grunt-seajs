define(function(require, exports, module) {
	var i18n = {
		title:{
			tip:""
		},
		btn:{
			confirm:"确定",
			cancel:"取消"
		},
		chooseFace:{
			title:"选择表情"
		},
		upload:{
			title:"上传图片",
			text:function(arr){
				return i18n.implace("共{0}张,还能上传{1}张",arr)
			}
		},
		sinaWeibo:{
			bindSuccess:"已成功绑定新浪微博"
		},
		PerfectLight:{
			share:"分享自己的人脉圈"
		},
		showpic:{
			s:"收起",c:"查看大图",xl:"向左旋转",xr:"向左旋转"
		}
		
	}
	i18n.implace = function(str,arr){
		for(var i=0;i<arr.length;i++){
			var reg = new RegExp("\\{"+i+"\\}","g");
			str = str.replace(reg,arr[i]);
		}
		return str;
	}
	module.exports = i18n;
})