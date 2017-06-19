// NOTE: paths are relative to each functions folder
var Webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");
const OptimizeJsPlugin = require("optimize-js-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./index.ts",
    target: "node",
    output: {
        path:  process.cwd(),
        filename: "index.js",
        libraryTarget: "commonjs2",
    },

    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                options: {
                    cacheDirectory: true
                },
                exclude: [/node_modules/]
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new Webpack.NoEmitOnErrorsPlugin(),
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new UglifyJSPlugin({
            compress: { warnings: false },
            output: { comments: false },
            sourceMaps: false
        })
    ]
};