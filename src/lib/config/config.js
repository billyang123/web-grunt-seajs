(function() {
    var root = this;

    var config = {
        base: typeof process === "undefined" ? window.HEALTH.cdnPath : null,

        alias: {
            // plugins
            autosize: 'alinw/jquery-autosize/1.18.1/jquery-autosize',
            marionette: 'plugins/marionette/marionette',
            backbone: 'gallery/backbone/1.1.0/backbone',
            handlebars: typeof process != "undefined" ? 'alinw/handlebars/1.3.0/runtime' : 'alinw/handlebars/1.3.0/handlebars',
            "Handlebars2": 'gallery/handlebars/1.0.2/handlebars',
            "$": 'alinw/jquery/1.8.3/jquery',            
            "$-debug": 'alinw/jquery/1.8.3/jquery-debug',
            json: "gallery/json/1.0.3/json",
            uri: "gallery/jsuri/1.2.2/jsuri",
            moment: "gallery/moment/2.3.1/moment",
            underscore: 'gallery/underscore/1.5.2/underscore',
            "_": 'gallery/underscore/1.5.2/underscore',
            "underscore.string": "alinw/underscore-string/0.0.1/underscore-string",
            widget:'arale/widget/1.1.1/widget',
            //global.css
            'global.css':'platform/common/s/1.1/global/global.css',
            //kumaCss
            'kuma.css':'alinw/kuma/2.1.1/kuma.css',

            "confirmbox":"alinw/dialog/1.2.6/confirmbox",
            "dialog":"alinw/dialog/1.2.6/dialog",
            "tipconfirm":'alinw/tip/2.2.0/tipconfirm',
            "tip":'alinw/tip/2.2.0/tip',
            "Highcharts":"alinw/highcharts/4.0.1/highcharts",
            "validator":"alinw/validator/3.1.1/validator",
            "select":"alinw/select/2.0.7/select",
            "calendar": "alinw/calendar/1.1.8/calendar",
            "calendar.css": "alinw/calendar/1.1.8/calendar.css",
            "jquery-scrollto":"alinw/jquery-scrollto/1.4.6/jquery-scrollto",
            "uploadx":"alinw/uploadx/1.0.0/uploadx",
            "upload":"alinw/upload/2.1.0/upload",
            "switchable":"alinw/switchable/1.0.1/switchable",
            "carousel":"alinw/switchable/1.0.1/carousel",
            "network":"alinw/network/1.1.3/network",

            //"selectperson":"alinw/selectperson/1.0.12/selectperson",
            helper:'lib/handlebars-helper/handlebars-helper',
            jqueryRails:"lib/jquery-ujs/jquery-ujs",
            // utils
            ajax:"utilsPath/ajax",
            common:'utilsPath/common',
            // widgets
            detectZoom: 'alinw/detect-zoom/1.0.2/detect-zoom',
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
            "$","helper","jqueryRails","ajax","common"
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
