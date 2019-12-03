const commonPaths = require("./common-paths");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const port = process.env.PORT || 3000;

const config = {
  mode: "development",
  entry: {
    app: `${commonPaths.appEntry}/index.js`
  },
  output: {
    filename: "[name].[hash].js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
              sourceMap: true
            }
          }
        ]
      },
      { test: /\.(woff2?|ttf)$/i, use: [{ loader: "file-loader" }] }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    hot: true,
    open: true
  }
};

module.exports = config;
