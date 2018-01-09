'use strict';

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HappyPack = require('happypack');

function getPath(tsPath) {
  return path.join(__dirname, tsPath);
}

module.exports = {
  entry: {
    app: [getPath('src/index.ts')]
  },
  output: {
    path: getPath('src/dist/'),
    filename: '[name].js',
    publicPath: '/src/dist/',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js']
  },
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
    new FriendlyErrorsWebpackPlugin(),
    new StylelintPlugin({
      files: [
        'src/**/*.vue'
      ]
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      vue: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: [getPath('src')],
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
          loaders: {
            scss: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  watchOptions: {
    poll: true
  },
  devServer: {
    port: 8080,
    hot: true
  }
};
