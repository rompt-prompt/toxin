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
        'index': './src/pages/index/index.js',
        'sandbox': './src/pages/sandbox/sandbox.js',
        'colors-type': './src/pages/colors-type/colors-type.js',
        'form-elements': './src/pages/form-elements/form-elements.js',
        'cards': './src/pages/cards/cards.js',
        'headers-footers': './src/pages/headers-footers/headers-footers.js',
        'landing': './src/pages/landing/landing.js',
        'search-filter': './src/pages/search-filter/search-filter.js',
        'room-details': './src/pages/room-details/room-details.js',
        'sign-in': './src/pages/sign-in/sign-in.js',
    },
    output: {
        path: __dirname + '/dist',
        clean: true,
    },
    devServer: {
        open: true,
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 8080,
        // watchFiles: ['./src/**/*.pug', './src/**/*.scss'],
        client: {
            progress: true,
          },
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/pages/index/index.pug",
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: "sandbox.html",
            template: "./src/pages/sandbox/sandbox.pug",
            chunks: ['sandbox'],
        }),
        new HtmlWebpackPlugin({
            filename: "colors-type.html",
            template: "./src/pages/colors-type/colors-type.pug",
            chunks: ['colors-type'],
        }),
        new HtmlWebpackPlugin({
            filename: "form-elements.html",
            template: "./src/pages/form-elements/form-elements.pug",
            chunks: ['form-elements'],
        }),
        new HtmlWebpackPlugin({
            filename: "cards.html",
            template: "./src/pages/cards/cards.pug",
            chunks: ['cards'],
        }),
        new HtmlWebpackPlugin({
            filename: "headers-footers.html",
            template: "./src/pages/headers-footers/headers-footers.pug",
            chunks: ['headers-footers'],
        }),
        new HtmlWebpackPlugin({
            filename: "landing.html",
            template: "./src/pages/landing/landing.pug",
            chunks: ['landing'],
        }),
        new HtmlWebpackPlugin({
            filename: "search-filter.html",
            template: "./src/pages/search-filter/search-filter.pug",
            chunks: ['search-filter'],
        }),
        new HtmlWebpackPlugin({
            filename: "/room-details.html",
            template: "./src/pages//room-details//room-details.pug",
            chunks: ['/room-details'],
        }),
        new HtmlWebpackPlugin({
            filename: "sign-in.html",
            template: "./src/pages/sign-in/sign-in.pug",
            chunks: ['sign-in'],
        }),

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
                    filename: 'images/[name][ext][query]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|eotf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]',
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