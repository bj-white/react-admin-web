const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '/src/'),
        /* proxy: {
            "/api": {
              target: 'http://localhost:9527',
              pathRewrite: {'^/api' : ''},
              changeOrigin: true
            }
        }, */
        disableHostCheck: true,
    },
});