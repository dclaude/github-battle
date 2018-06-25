const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// extract-text-webpack-plugin does not work with webpack 4:
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//
module.exports = {
  entry: [ 'babel-polyfill', 'whatwg-fetch', './app/index.js' ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: '/', // all the assets served by our server start with the path '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
  ],
}

