/* eslint import/no-extraneous-dependencies: "off" */

const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HashOutput = require("webpack-plugin-hash-output");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = merge(common, {
  plugins: [
    new MinifyPlugin(),
    new HashOutput(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
});
