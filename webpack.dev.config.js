const { merge } = require("webpack-merge");
const basic = require("./webpack.basic.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(basic, {
    mode: 'development',
    devtool: 'source-map',
    stats: {
        children: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/, 
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            //Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },   
        ]
    }
});