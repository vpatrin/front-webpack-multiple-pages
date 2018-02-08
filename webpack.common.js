/* eslint import/no-extraneous-dependencies: "off" */
/* eslint global-require: "off" */

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const extractCss = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development",
});

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development",
});

module.exports = {
  entry: {
    login: "./src/login",
    bottles: "./src/bottles",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.css$/,
        use: extractCss.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")({ root: loader.resourcePath }),
                  require("stylelint")(),
                  require("postcss-cssnext")(),
                  require("cssnano")(),
                ],
              },
            },
          ],
          fallback: "style-loader",
        }),
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")({ root: loader.resourcePath }),
                  require("postcss-cssnext")(),
                  require("cssnano")(),
                ],
              },
            },
            "sass-loader",
          ],
          fallback: "style-loader",
        }),
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.jpe?g|\.png|\.mp3$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    extractCss,
    extractSass,
    new FaviconsWebpackPlugin({
      logo: "./src/images/favicon.png",
      background: "#fff",
      title: "front-webpack-multiple-pages",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/login/index.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      filename: "bottles.html",
      template: "src/bottles/index.html",
      chunks: ["bottles"],
    }),
  ],
};
