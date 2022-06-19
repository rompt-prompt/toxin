const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globule = require("globule");
const fs = require("fs");


let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log('выполняется в ' + mode)

const pugMixins = globule
    .find(["src/blocks/**/_*.pug", "!src/blocks/_blocks.pug"])
    .map((path) => path.split('/').slice(-2).join('/'))
    .reduce((acc, currentItem) => acc + `include ${currentItem}\n`, ``);

console.log('Найдены миксины pug:\n' + pugMixins);

fs.writeFile("src/blocks/_blocks.pug", pugMixins, (err) => {
    if (err) throw err;
    console.log("Миксины pug подключены автоматически");
});

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
            template: "./src/pages/ui-kit/ui-kit.pug"
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