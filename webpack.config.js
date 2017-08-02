var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        "nz/scripts/more-info-large": "./src/nz/more-info-large.ts",
        "nz/scripts/more-info-small": "./src/nz/more-info-small.ts",
        "nz/scripts/price-info": "./src/nz/price-info.ts",

        "au/scripts/more-info-large": "./src/au/more-info-large.ts",
        "au/scripts/more-info-small": "./src/au/more-info-small.ts",        
        "au/scripts/register-interest-small": "./src/au/register-interest-small.ts",
        "au/scripts/register-interest-large": "./src/au/register-interest-large.ts",       
        "au/scripts/price-info": "./src/au/price-info.ts"
    },

    output: {
        path: path.join(__dirname, "dist"),
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
        new CopyWebpackPlugin([
            {
                from : './src/nz/fonts/',
                to : './nz/fonts'
            },
            {
                from : './src/nz/html/',
                to : './nz/html'
            },
            {
                from : './src/nz/images/',
                to : './nz/images'
            },
            {
                from : './src/nz/js/',
                to : './nz/js'
            },
            {
                from : './src/nz/styles/',
                to : './nz/styles'
            },
            {
                from : './src/au/fonts/',
                to : './au/fonts'
            },
            {
                from : './src/au/html/',
                to : './au/html'
            },
            {
                from : './src/au/images/',
                to : './au/images'
            },
            {
                from : './src/au/js/',
                to : './au/js'
            },
            {
                from : './src/au/styles/',
                to : './au/styles'
            }
        ]),
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
        }),        
    ]
}
