const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // for error to point to the original source file and not the bundle.js one
  devServer: {
    /*
    react-router config:
    qd le webpack-dev-server recoit un GET pour par ex '/popular'
    alors il va faire un redirect vers '/' 
    et du coup react-router va loader la route associee a '/popular'
    */
    historyApiFallback: true,
    contentBase: './dist',
  },
  module: {
    rules: [
      // use style-loader instead of mini-css-extract-plugin in dev mode, because otherwise the CSS does not refresh automatically with webpack-dev-server
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
    ]
  },
})

