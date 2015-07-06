define(function(require, exports, module) {
	var i18n = {
		title:{
			tip:"��ʾ"
		},
		btn:{
			confirm:"ȷ��",
			cancel:"ȡ��"
		},
		chooseFace:{
			title:"ѡ�����"
		},
		upload:{
			title:"�ϴ�ͼƬ",
			text:function(arr){
				return i18n.implace("��{0}�ţ������ϴ�{1}��",arr);
			}
		},
		sinaWeibo:{
			bindSuccess:"�ѳɹ�������΢��"
		},
		PerfectLight:{
			share:"�����Լ�������Ȧ"
		},
		showpic:{
			s:"����",c:"�鿴��ͼ",xl:"������ת",xr:"������ת"
		},
		reply:function(arr){
			return i18n.implace("�ظ�@{0}��",arr);
		},
		validateMessage:{
			nologin:{
				email:{     
		            required: "������һ�������ַ",
		            renheAccount:"��������ȷ��������ֻ����룡"
		        },     
		        password:{     
		            required: "������������������",
		            minlength:function(arr){
		            	return i18n.implace('����������{0}λ',arr)
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