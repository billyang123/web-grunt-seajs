define(function(require, exports, module) {
	require('metadata');
	require('jquery-validate');
	require('tab');
	require('alert');
	// 多个表单
	$.metadata.setType("attr", "validate");
	$.validator.setDefaults({
	   debug: true
	})
	$.validator.addMethod("renheEmail", function(value, element, param) {    
	  	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		return reg.test(value); 
	}, "请输入正确格式的邮箱！");
	/* 设置默认属性 */    
	$.validator.setDefaults({    
		submitHandler: function(form) { form.submit(); },
		errorPlacement: function(error, element) {
	        //console.log(error, element)
	        if(element.attr('aria-invalid') == 'false'){
	            return
	        }
			var errorDocArr = [
				'<div class="alert alert-danger alert-dismissible fade in" role="alert">',
	            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>',
	            '<p>'+error.html()+'</p>',
	            '</div>'
	        ]
			element.closest('form').find('.js-renhe-error').html(errorDocArr.join(''))
		},
	    success:function(label,elem){
	        $(elem).closest('form').find('.js-renhe-error').empty();
	    }
	});  
	$('.rh-circle-list a').mouseover(function(e) {
	    e.preventDefault()
	    $(this).tab('show')
	})
	var validateMessage = {         
	    email:{     
	        required: "请输入一个邮箱地址"
	    },     
	    password:{     
	        required: "请输入您的邮箱密码"   
	    }
	}
	// var rmck = $('.js-rember');
	// if($.cookie("renheEmailPass")){
//	     rmck.attr('checked',true);
//	     rmck.closest('form').find('[name="password"]').val($.cookie("renheEmailPass"));
//	     rmck.closest('form').find('[name="email"]').val($.cookie("renheEmail"))
	// }else{
//	     rmck.attr('checked',false);
	// }
	$('.js-rember').click(function(e){
	    if($(this).is(":checked")){
	        $.cookie("renheEmail",$(this).closest('form').find('[name="email"]').val(),{ expires: 7 });
	        $.cookie("renheEmailPass",$(this).closest('form').find('[name="password"]').val(),{ expires: 7 });
	    }else{
	        $.cookie("renheEmailPass",null);
	    }
	})
	$('#renheRegister').validate({
	    messages: validateMessage
	});
	$('#renheLogin').validate({
	    messages: validateMessage
	});
})
