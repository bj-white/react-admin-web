const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css|.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    }
                ],
            },
            /* {
                test: /\.css|.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }, */
            {
                test: /\.js|jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {}
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            enforce: "pre",
                        },
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: 'url-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};