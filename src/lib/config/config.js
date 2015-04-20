(function() {
    var root = this;

    var config = {
        base: typeof process === "undefined" ? window.HEALTH.cdnPath : null,

        alias: {
            // plugins
            backbone: 'gallery/backbone/1.1.0/backbone',
            handlebars: typeof process != "undefined" ? 'alinw/handlebars/1.3.0/runtime' : 'alinw/handlebars/1.3.0/handlebars',
            "Handlebars2": 'gallery/handlebars/1.0.2/handlebars',
            "$": 'lib/jquery/1.8.3/jquery',
            json: "gallery/json/1.0.3/json",
            uri: "gallery/jsuri/1.2.2/jsuri",
            moment: "gallery/moment/2.3.1/moment",
            underscore: 'gallery/underscore/1.5.2/underscore',
            "_": 'gallery/underscore/1.5.2/underscore',
            widget:'arale/widget/1.1.1/widget',

            //"selectperson":"alinw/selectperson/1.0.12/selectperson",
            helper:'lib/handlebars-helper/handlebars-helper',
            jqueryRails:"lib/jquery-ujs/jquery-ujs",
            // utils
            ajax:"utilsPath/ajax",
            // widgets
            "printarea":"widgets/printarea/printarea"

        },
        paths: {
            //testPath: 'apps/test',
            utilsPath: 'utils',

            // 业务模块
            // admin
             //adminSupplierManager: 'scripts/admin/supplier-manager',
             

        },
        comboSyntax: ["??", ","],
        comboMaxLength: 500,
        preload: [
            window.$ || window.jQuery ? '' :'$'
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
