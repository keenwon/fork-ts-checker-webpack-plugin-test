'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const configs = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  watchOptions: {
    poll: true
  },
  devServer: {
    hot: true,
    openPage: 'dashboard',
    overlay: true,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: 'app.html' }
      ]
    }
  }
});

module.exports = configs;
