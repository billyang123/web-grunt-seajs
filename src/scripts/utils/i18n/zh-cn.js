define(function(require, exports, module) {
	var i18n = {
		title:{
			tip:"提示"
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
				return i18n.implace("共{0}张，还能上传{1}张",arr);
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
		},
		reply:function(arr){
			return i18n.implace("回复@{0}：",arr);
		},
		validateMessage:{
			nologin:{
				email:{     
		            required: "请输入一个邮箱地址",
		            renheAccount:"请输入正确的邮箱或手机号码！"
		        },     
		        password:{     
		            required: "请输入您的邮箱密码",
		            minlength:function(arr){
		            	return i18n.implace('密码必须大于{0}位',arr)
		            }
		        }
			}
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