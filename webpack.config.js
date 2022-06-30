const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')


let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log('выполняется в ' + mode)

module.exports = {
    mode: mode,
    entry: {
        index: './src/pages/index/index.js',
        sandBox: './src/pages/sandbox/sandbox.js',
        colorsNtype: './src/pages/colors-and-type/colors-and-type.js',
    },
    output: {
        clean: true,
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/pages/index/index.pug",
        }),
        new HtmlWebpackPlugin({
            filename: "colors-and-type.html",
            template: "./src/pages/colors-and-type/colors-and-type.pug",
        }),
        new HtmlWebpackPlugin({
            filename: "sandbox.html",
            template: "./src/pages/sandbox/sandbox.pug",
        }),

        // new HtmlWebpackPlugin({
        //     template: "./src/pages/ui-kit/ui-kit.pug"
        // }),
        // new HtmlWebpackPlugin({
        //     template: "./src/pages/cards/cards.pug"
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/, 
                exclude: /node_modules/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
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

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[contenthash][ext][query]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|eotf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[contenthash][ext][query]',
                }
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loader: 'pug-loader',
            },
            {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
            }
            }
                
        ]
    }
}