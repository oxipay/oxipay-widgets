var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        "nz/Content/scripts/more-info-large": "./src/nz/more-info-large.ts",
        "nz/Content/scripts/more-info-small": "./src/nz/more-info-small.ts",
        "nz/Content/scripts/price-info": "./src/nz/price-info.ts",

        "au/Content/scripts/more-info-large": "./src/au/more-info-large.ts",
        "au/Content/scripts/more-info-small": "./src/au/more-info-small.ts",        
        "au/Content/scripts/register-interest-small": "./src/au/register-interest-small.ts",
        "au/Content/scripts/register-interest-large": "./src/au/register-interest-large.ts",       
        "au/Content/scripts/price-info": "./src/au/price-info.ts"
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
                to : './nz/Content/fonts'
            },
            {
                from : './src/nz/html/',
                to : './nz/Content/html'
            },
            {
                from : './src/nz/images/',
                to : './nz/Content/images'
            },
            {
                from : './src/nz/js/',
                to : './nz/Content/js'
            },
            {
                from : './src/nz/styles/',
                to : './nz/Content/styles'
            },
            {
                from : './src/au/fonts/',
                to : './au/Content/fonts'
            },
            {
                from : './src/au/html/',
                to : './au/Content/html'
            },
            {
                from : './src/au/images/',
                to : './au/Content/images'
            },
            {
                from : './src/au/js/',
                to : './au/Content/js'
            },
            {
                from : './src/au/styles/',
                to : './au/Content/styles'
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
