const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const pagesPath = './src/pages';
const pages = [
    'index',
    'colors-type',
    'form-elements',
    'cards',
    'headers-footers',
    'landing',
    'search-filter',
    'room-details',
    'registration',
    'sign-in'
];
const htmlWebpackPluginTemplates = [];
const entries = {};
pages.forEach(page => {
    htmlWebpackPluginTemplates.push(
        new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: `${pagesPath}/${page}/${page}.pug`,
            chunks: [page],
        }),
    ),
    entries[page] = `${pagesPath}/${page}/${page}.js`
});

module.exports = {
    entry: {
        ...entries,
    },
    output: {
        path: __dirname + '/docs',
        filename: 'js/[name].[contenthash].js',
        clean: true,
    },
    plugins: [
        ...htmlWebpackPluginTemplates,

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[contenthash][ext][query]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|eotf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash][ext][query]',
                }
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loader: 'pug-loader',
                options: {
                    pretty: true,
                },
            },
            {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
            },
            },
        ]
    }
}