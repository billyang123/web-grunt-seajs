(function() {
    var root = this;
    var assetsPath = "http://devww.renhe.cn/";
    var config = {
        base: typeof process === "undefined" ? window.HEALTH.assetsPath : null,

        alias: {
            // plugins
            "handlebars": 'plugins/handlebars/handlebars-1-0-2',
            "$": assetsPath+'lib/jquery/jquery-1-8-3',
            "jQuery": assetsPath+'lib/jquery/jquery-1-8-3',
            "metadata": 'plugins/jquery-metadata/jquery-metadata',
            'jquery-validate':'plugins/jquery-validate/jquery-validate',
            "tab":'plugins/bootstrap/tab',
            "collapse":'plugins/bootstrap/collapse',
            "alert":'plugins/bootstrap/alert',
            "carousel":'plugins/bootstrap/carousel',
            "transition":'plugins/bootstrap/transition',
            "jquery.ui":'plugins/jqueryui/jqueryui',
            "jquery.fileupload":'plugins/fileupload/jqueryfileupload',
            "jquery.iframe-transport":'plugins/fileupload/jquery-iframe-transport',
            
            
        },
        paths: {
            utilsPath: 'utils',
            
            // 业务模块

        },
        comboSyntax: ["??", ","],
        comboMaxLength: 500,
        preload: [
            '$'
        ],
        map: [],
        charset: 'utf-8',
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
