const commonPaths = require("./common-paths");

const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const config = {
  mode: "production",
  entry: {
    app: [`${commonPaths.appEntry}/index.js`]
  },
  output: {
    filename: "static/[name].[hash].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localsConvention: "camelCase",
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      { test: /\.(woff2?|ttf)$/i, use: [{ loader: "file-loader" }] }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inlineSource: ".(js|css)$" // embed all javascript and css inline
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new HTMLInlineCSSWebpackPlugin()
  ]
};

module.exports = config;
