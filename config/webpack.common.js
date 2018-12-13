const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    'reactable-bundle': ['@babel/polyfill', path.resolve(__dirname, '..', 'src', 'index.js')],
  },
  output: {
    filename: 'reactable-bundle.js',
    path: path.resolve('./dist/'),
    library: 'Reactable',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', '@babel/preset-react',
              ],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(bower_components)/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?sourceMap' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
