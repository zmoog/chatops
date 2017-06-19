// NOTE: paths are relative to each functions folder
var nodeExternals = require("webpack-node-externals");

module.exports = {
    target: "node",
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".js"]
    },
    target: "node",
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
    devtool: "source-map",
};