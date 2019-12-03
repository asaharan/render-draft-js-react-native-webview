const commonPaths = require("./common-paths");

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
              modules: true,
              importLoaders: 1,
              localsConvention: "camelCase",
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: "base64-inline-loader"
      }
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
    new HtmlWebpackInlineSourcePlugin()
  ]
};

module.exports = config;
