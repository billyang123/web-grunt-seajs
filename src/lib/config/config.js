(function() {
    var root = this;
    var assetsPath = "";
    var config = {
        base: typeof process === "undefined" ? window.HEALTH.assetsPath : null,
		vars: {
		    'locale': 'zh-cn'
		},
        alias: {
            // lib
            "$": 'lib/jquery/jquery-1-7-1-gbk-min.js',
            "jQuery": 'lib/jquery/jquery-1-7-1-gbk-min.js',
            // plugins
            "handlebars": 'plugins/handlebars/handlebars',
            "handlebars-helper":'plugins/handlebars/handlebars-helper',
            "metadata": 'plugins/jquery-metadata/jquery-metadata',
            'jquery-validate':'plugins/jquery-validate/jquery-validate',
            "tab":'plugins/bootstrap/tab',
            "collapse":'plugins/bootstrap/collapse',
            "dropdown":'plugins/bootstrap/dropdown',
            "alert":'plugins/bootstrap/alert',
            "carousel":'plugins/bootstrap/carousel',
            "owlcarousel":'plugins/owl-carousel/carousel',
            "transition":'plugins/bootstrap/transition',
            "jquery.ui":'plugins/jqueryui/jqueryui',
            "jquery.fileupload":'plugins/fileupload/jqueryfileupload',
            "jquery.iframe-transport":'plugins/fileupload/jquery-iframe-transport',
            "ajaxRails":'plugins/jquery-ujs/jquery-rails',
            "sticky":'plugins/renhe-uk/sticky',
            //widget
            "Renhe":'scripts/widget/renhe/renhe',
            //utilsPath
            "common":"utilsPath/common/common"
        },
        paths: {
            utilsPath: 'scripts/utils',
            i18n:'scripts/utils/i18n'

        },
        comboSyntax: ["??", ","],
        comboMaxLength: 500,
//        preload: [
//            'common'
//        ],
        map: [],
        charset: 'gbk',
        timeout: 20000,
        debug: true
    };
    if (root.seajs) {
        root.seajs.config(config);
    }

    return config;
}).call(this);
