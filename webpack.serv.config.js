const { merge } = require("webpack-merge");
const basic = require("./webpack.basic.config.js");

module.exports = merge(basic, {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    stats: {
        children: true,
    },
    devServer: {
        open: true,
        historyApiFallback: true,
        compress: true,
        hot: true,
        liveReload: true,
        watchFiles: ['src/**/*', 'docs/**/*'],
        port: 8080,
        client: {
            overlay: {
                errors: true,
                warnings: true,
              },
            progress: true,
            reconnect: true,
          },
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/, 
                exclude: /node_modules/,
                use: [
                    "style-loader",
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