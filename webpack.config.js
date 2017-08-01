var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        "nz/more-info-large": "./src/nz/more-info-large.ts",
        "nz/more-info-small": "./src/nz/more-info-small.ts",
        "nz/price-info": "./src/nz/price-info.ts",

        "aus/more-info-large": "./src/aus/more-info-large.ts",
        "aus/more-info-small": "./src/aus/more-info-small.ts",        
        "aus/register-interest-small": "./src/aus/register-interest-small.ts",
        "aus/register-interest-large": "./src/aus/register-interest-large.ts",       
        "aus/price-info": "./src/aus/price-info.ts"
    },

    output: {
        path: path.join(__dirname, "widgets"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.ts?$/, loader: 'ts-loader', sourceMap: false }
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
