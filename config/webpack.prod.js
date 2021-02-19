const webpack = require("webpack");
const merge = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CompressionPlugin(),
  ],
});
