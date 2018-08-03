const webpack = require('webpack')
const path = require('path')
const babel = require('../loaders/babel.js')

module.exports = {
  entry: {
    'reactable-bundle': ['babel-polyfill', path.resolve(__dirname,'..', 'src', 'index.js')],
  },
  output: {
    filename: 'reactable-bundle.js',
    path: path.resolve('../dist/'),
    library: 'Reactable',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      babel,
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader?sourceMap'] },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
