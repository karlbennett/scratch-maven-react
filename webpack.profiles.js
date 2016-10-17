const webpack = require('webpack');

module.exports = {
    dev: {
        activeByDefault: true,
        config: {
            devtool: 'eval',
            output: {
                // This is the name of the final compacted file.
                filename: 'bundle.js'
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('development')
                    }
                })
            ]
        }
    },
    prod: {
        config: {
            devtool: 'cheap-module-source-map',
            output: {
                // The production file has a random hash added to bust any caching.
                filename: 'bundle.[hash].js'
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                }),
                new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    compressor: {
                        warnings: false,
                    },
                })
            ]
        }
    }
};