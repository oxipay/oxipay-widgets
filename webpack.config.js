var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        "nz/content/scripts/more-info-large": "./src/nz/more-info-large.ts",
        "nz/content/scripts/more-info-small": "./src/nz/more-info-small.ts",
        "nz/content/scripts/price-info": "./src/nz/price-info.ts",
        "nz/content/scripts/payments": "./src/nz/payments.ts",
        "nz/content/scripts/payments-weekly": "./src/nz/payments-weekly.ts",

        "au/content/scripts/more-info-large": "./src/au/more-info-large.ts",
        "au/content/scripts/more-info-small": "./src/au/more-info-small.ts",
        "au/content/scripts/register-interest-small": "./src/au/register-interest-small.ts",
        "au/content/scripts/register-interest-large": "./src/au/register-interest-large.ts",
        "au/content/scripts/price-info": "./src/au/price-info.ts",
        "au/content/scripts/payments": "./src/au/payments.ts",
        "au/content/scripts/payments-weekly": "./src/au/payments-weekly.ts",
        "au/content/scripts/landing-page": "./src/au/landing-page.ts",
        "au/content/scripts/more-info-1": "./src/au/more-info-1.ts"
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
            { test: /\.css$/, loader: "style!css?url=false" },
            { test: /\.ts?$/, loader: 'ts-loader', sourceMap: false }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from : './src/nz/fonts/',
                to : './nz/content/fonts'
            },
            {
                from : './src/nz/html/',
                to : './nz/content/html'
            },
            {
                from : './src/nz/images/',
                to : './nz/content/images'
            },
            {
                from : './src/nz/js/',
                to : './nz/content/js'
            },
            {
                from : './src/nz/styles/',
                to : './nz/content/styles'
            },
            {
                from : './src/au/fonts/',
                to : './au/content/fonts'
            },
            {
                from : './src/au/html/',
                to : './au/content/html'
            },
            {
                from : './src/au/images/',
                to : './au/content/images'
            },
            {
                from : './src/au/js/',
                to : './au/content/js'
            },
            {
                from : './src/au/styles/',
                to : './au/content/styles'
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
            mangle: false,
            sourceMap: true
        }),        
    ]
}
