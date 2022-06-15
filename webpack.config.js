const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log('выполняется в ' + mode)

module.exports = {
    mode: mode,
    output: {
        clean: true,
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.pug"
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
                    filename: 'assets/images/[contenthash][ext][query]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|eotf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[contenthash][ext][query]',
                }
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loader: 'pug-loader',
            }
        ]
    }
}