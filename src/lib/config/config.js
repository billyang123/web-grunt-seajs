(function() {
    var root = this;

    var config = {
        base: typeof process === "undefined" ? window.HEALTH.assetsPath : null,

        alias: {
            // plugins
            handlebars: typeof process != "undefined" ? 'lib/plugins/handlebars/handlebars' : 'alinw/handlebars/1.3.0/handlebars',
            "$": 'lib/jquery/jquery-1-8-3',
            "jQuery": 'lib/jquery/jquery-1-8-3',
            "metadata": 'plugins/jquery-metadata/jquery-metadata',
            'jquery-validate':'plugins/jquery-validate/jquery-validate',
            "tab":'plugins/bootstrap/tab',
            "collapse":'plugins/bootstrap/collapse',
            "alert":'plugins/bootstrap/alert'
            
        },
        paths: {
            //testPath: 'apps/test',
            utilsPath: 'utils',
            jqueryui: '"http://devww.renhe.cn/plugins/jqueryui',
            lib: "http://devww.renhe.cn/lib",
            plugins:"http://devww.renhe.cn/plugins",
            scripts:"http://devww.renhe.cn/scripts"
            // 业务模块
            // admin
             //adminSupplierManager: 'scripts/admin/supplier-manager',
             

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
    config.paths.lib = "http://devww.renhe.cn/lib";
    if (root.seajs) {
        root.seajs.config(config);
    }

    return config;
}).call(this);
