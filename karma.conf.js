var path = require("path");

// Karma configuration
module.exports = function (config) {
    config.set({

        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // Frameworks to use
        // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'jsmockito-jshamcrest'],

        // List of files / patterns to load in the browser
        files: [
            'src/test/javascript/**/*.spec.js'
        ],

        // List of files to exclude
        exclude: [],

        // Compile the ES6 files before the tests are run.
        // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/test/javascript/**/*.spec.js': ['webpack']
        },

        // The configuration for the karma-webpack plugin.
        // This should be very similar to the main webpack.config.js.
        webpack: {
            isparta: {
                babel: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            module: {
                preLoaders: [
                    {
                        loader: 'isparta-loader',
                        test: path.join(__dirname, './src/main/javascript')
                    }
                ],
                loaders: [
                    {
                        loader: 'babel-loader',
                        test: [
                            path.join(__dirname, './src/main/javascript'),
                            path.join(__dirname, './src/test/javascript')
                        ],
                        query: {
                            presets: ['es2015', 'react', 'stage-0']
                        }
                    }
                ]
            }
        },

        // Turn off verbose logging of webpack compilation.
        webpackMiddleware: {
            noInfo: true
        },

        // Test results reporter to use
        // Possible values: 'dots', 'progress'
        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'target/coverage/',
            reporters: [
                {type: 'html', subdir: "html"},
                {type: 'lcovonly', subdir: "lcov"}
            ]
        },

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers
        // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // If true, Karma captures browsers, runs the tests and exits
        singleRun: true
    })
};