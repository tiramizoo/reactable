const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')


module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '..', 'public'),
    compress: true,
    publicPath: '/dist/',
    inline: true,
    hot: true,
    port: 9000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
