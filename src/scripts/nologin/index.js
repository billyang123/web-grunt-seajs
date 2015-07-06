define(function(require, exports, module) {
	var $ = require("$");
	var i18n = require("i18n/{locale}");
	var validateMessage = i18n.validateMessage.nologin;
    require('metadata');
    require('jquery-validate');
    require('tab');
    require('alert');
    $.metadata.setType("attr", "validate");
    $.validator.setDefaults({
       debug: true
    })
    $.validator.addMethod("renheAccount", function(value, element, param) {
        var reg = /(^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)|((86)*0*13\d{9})/      
        return reg.test(value);
    });
    $.validator.setDefaults({    
        submitHandler: function(form) { form.submit(); },
        errorPlacement: function(error, element) {
       
            if(element.attr('aria-invalid') == 'false'){
                return
            }
            var errorDocArr = [
                '<div class="alert alert-danger alert-dismissible fade in" role="alert">',
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">¡Á</span></button>',
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
            required: validateMessage.email.required,
            renheAccount:validateMessage.email.renheAccount
        },     
        password:{     
            required: validateMessage.password.required,
            minlength:validateMessage.password.minlength([6])
        }
    }
    
    $('#renheRegister').validate({
        messages: validateMessage
    });
    $('#renheLogin').validate({
        messages: validateMessage
    });
    return $;
})