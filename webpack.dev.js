const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: '/',
        historyApiFallback: true,
        proxy: {
            "/api": {
              target: 'http://localhost:9527',
              pathRewrite: {'^/api' : ''},
              changeOrigin: true
            }
        },
        disableHostCheck: true,
    },
});