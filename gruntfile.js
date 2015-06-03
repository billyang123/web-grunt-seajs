var fs = require("fs");
var path = require("path");
var assetsPath = "../assets";
module.exports = function(grunt) {

    var configFile = grunt.option("config");
    var isBeautify = grunt.option("isBeautify");
    if (!configFile) {
        grunt.log.error("helps:");
        grunt.log.error("--config : config file for seajs");
        grunt.log.error("--isBeautify : is beautify for output");
        return;
    }
    if (!fs.existsSync(configFile)) {
        grunt.log.error("Config file: " + configFile + " does not exist");
        return;
    }

    var configFileContent = fs.readFileSync(configFile, "utf-8");
    configFileContent = eval(configFileContent);

     var config = {};
     //return console.log(path.join(process.cwd(), "src"));
    config.cmd_transport = {
        options: {
            debug: false,
            logLevel: "WARNING",
            useCache: true,
            rootPath: path.join(process.cwd(), "src"),
            paths: [
                path.join(process.cwd(), "src")
            ],
            alias: configFileContent.alias,
            aliasPaths: configFileContent.paths,
            handlebars: {
                id: 'alinw/handlebars/1.3.0/runtime',
                knownHelpers: [
                    "if",
                    "each",
                    "with"
                ]
            }
        },
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".js",
                    cwd: "src",
                    filter: "isFile" 
                },
                {
                    src: ["**/*.handlebars"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".handlebars.js",
                    cwd: "src",
                    filter: "isFile"
                },
                {
                    src: ["**/*.css"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".css.js",
                    cwd: "src",
                    filter: "isFile"
                }
            ]
        }
    };

    config.cmd_concat = {
        options: {
            paths: [
                path.normalize(path.join(__dirname,  assetsPath))
            ],
            logLevel: "WARNING",
            useCache: true,
            filters: false,
            include: "all"
        },
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: assetsPath,
                    expand: true,
//                    ext: ".js",
                    cwd: assetsPath,
                    filter: "isFile"
                }
            ]
        }
    };

    // https://github.com/gruntjs/grunt-contrib-uglify
    config.uglify = {
        options: {
            mangle: true,
            beautify: isBeautify,
            report: "min",
            preserveComments: false,
            compress: isBeautify ? false : {
                warnings: false
            }
        },
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".js",
                    cwd: assetsPath,
                    filter: function(file) {
                        var stats = fs.lstatSync(file);
                        return stats.isFile() && !/\-debug\.*\.js$/.test(file);
                    }
                }
            ]
        }
    };

    // less: https://github.com/gruntjs/grunt-contrib-less
    config.less = {
        options: {
            paths: [
                path.normalize(path.join(__dirname, "src", "styles"))
            ],
            cleancss: !isBeautify,
            compress: !isBeautify,
            ieCompat: true
        },
        release: {
            files: [
                {
                    src: "src/styles/app.less",//"src/styles/**/*.less",
                    dest: assetsPath+"/styles/app.css"
                }
            ]
        },
        develop: {
            files: [
                {
                    src: "src/styles/app.less",
                    dest: "src/styles/app.css"
                }
            ]
        }
    };

    // css min: https://github.com/gruntjs/grunt-contrib-cssmin
    config.cssmin = {
        options: {
            keepSpecialComments: 0,
            report: "min"
        },
        release: {
            files: [
                {
                    src: ["**/*.css"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".css",
                    cwd: "src",
                    filter: "isFile"
                }
            ]
        }
    };

    // copy images
    config.copy = {
        release: {
            files: [
                {
                    src: ["**/*.png"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".png",
                    cwd: "src",
                    filter: "isFile"
                },
                {
                    src: ["**/*.jpg"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".jpg",
                    cwd: "src",
                    filter: "isFile"
                },
                {
                    src: ["**/*.jpeg"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".jpeg",
                    cwd: "src",
                    filter: "isFile"
                },
                {
                    src: ["**/*.gif"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".gif",
                    cwd: "src",
                    filter: "isFile"
                },
                {
                    src: ["**/*.eot"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".eot",
                    cwd: "src",
                    filter: "isFile"
                },
                {
                    src: ["**/*.svg"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".svg",
                    cwd: "src",
                    filter: "isFile"
                },
                {
                    src: ["**/*.ttf"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".ttf",
                    cwd: "src",
                    filter: "isFile"
                },
                {
                    src: ["**/*.woff"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".woff",
                    cwd: "src",
                    filter: "isFile"
                }
            ]
        }
    };
    // jade: https://github.com/gruntjs/grunt-contrib-jade    
    // config.jade = {
    //  compile: {
    //         options: {
    //             client: false,
    //             pretty: true
    //         },
    //         files: [ {
    //           src: ["*.jade"],
    //           dest: "src/pages/",
    //           ext: ".html",
    //           cwd: "src/templates/",
    //           expand: true
    //         } ]
    //     }
    // }
    // watch for develop
    config.watch = {
        develop: {
            files: ["src/styles/**/*.less"],
            tasks: ["less:develop"]
        }
        // ,
        // compile: {
        //  files: ["src/templates/**/*.jade"],
        //     tasks: ["jade:compile"]
        // } 
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks("grunt-cmd-nice");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');

    //grunt.loadNpmTasks('grunt-contrib-jade');
    var tasks = [
        "copy",
        "less:release",
        "cssmin",
        "cmd_transport",
        "cmd_concat"
    ];
    if (!isBeautify) {
        tasks.push("uglify");
    }
    grunt.registerTask("default", tasks);
    
    grunt.registerTask("css", [
        "less:release","jade:compile"
    ]);
    grunt.registerTask("test", [
        "watch"
    ]);
};