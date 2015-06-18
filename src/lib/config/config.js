(function() {
    var root = this;
    var assetsPath = "";
    var config = {
        base: typeof process === "undefined" ? window.HEALTH.assetsPath : null,

        alias: {
            // plugins
            "handlebars": 'plugins/handlebars/handlebars',
            "$": 'lib/jquery/jquery-1-7-1-gbk-min.js',
            "jQuery": 'lib/jquery/jquery-1-7-1-gbk-min.js',
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
            "ajaxRails":'plugins/jquery-ujs/jquery-ujs.js'
            
        },
        paths: {
            utilsPath: 'utils'
            
            // ҵ��ģ��

        },
        comboSyntax: ["??", ","],
        comboMaxLength: 500,
        preload: [
            '$','collapse'
        ],
        map: [],
        charset: 'gbk',
        timeout: 20000,
        debug: true
    };

    if (typeof process === "undefined") {
        config.paths.gallery = "https://a.alipayobjects.com/gallery";
        config.paths.arale = 'https://a.alipayobjects.com/arale';
        config.paths.alipay = 'https://a.alipayobjects.com/alipay';
        config.paths.platform = "https://s.tbcdn.cn/g/platform";
        config.paths.alinw = "https://s.tbcdn.cn/g/alinw";
        config.paths.alice = "https://a.alipayobjects.com/alice";
    }
    if (root.seajs) {
        root.seajs.config(config);
    }

    return config;
}).call(this);
