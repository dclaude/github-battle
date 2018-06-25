const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// extract-text-webpack-plugin does not work with webpack 4:
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // faster than inline-source-map which is used in dev mode
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // to extract CSS into a separate file:
          'css-loader', // to handle import of CSS files in JS code
        ]
      },
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    /*
    - Many libraries will key off the process.env.NODE_ENV variable to determine what should be included in the library. 
    For example, when not in production some libraries may add additional logging and testing to make debugging easier. 
    However, with process.env.NODE_ENV === 'production' they might drop or add significant portions of code to optimize how things run for your actual users.
    We can use webpack's built in DefinePlugin to define this variable for all our dependencies:
    - If you're using a library like react, you should actually see a significant drop in bundle size after adding this plugin. 
    Also note that any of our local /src code can key off of this as well, so the following check would be valid:
    @TODO: dans le index.js de notre app rajouter une log comme celle ci-dessous:
    if (process.env.NODE_ENV !== 'production') {
      console.log('Looks like we are in development mode');
    }
    - process.env.NODE_ENV within webpack config files
    Contrary to expectations, process.env.NODE_ENV is not set to "production" within the build script webpack.config.js
    Thus, conditionals like: process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 
    within webpack configurations do not work as expected
    */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // to extract CSS into a separate file:
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
    }),
  ]
})

