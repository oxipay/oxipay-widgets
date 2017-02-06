var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        "more-info-large": "./more-info-large.ts",
        "more-info-small": "./more-info-small.ts",
        "register-interest-large": "./register-interest-large.ts",
        "register-interest-small": "./register-interest-small.ts",
        "price-info": "./price-info.ts"
    },
    output: {
        path: path.join(__dirname, "../widgets"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.tsx?$/, loader: 'ts-loader', sourceMap: true }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            test: /\.js$/,
            filename: "[name].map.js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
            mangle: true,
            sourceMap: true
        })
    ]
}