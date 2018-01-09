'use strict';

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function getPath(tsPath) {
  return path.join(__dirname, '..', tsPath);
}

const config = {
  entry: {
    'app': [getPath('public/src/app/index.ts')]
  },
  output: {
    path: getPath('public/dist/'),
    filename: '[name].js',
    publicPath: '/public/dist/',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json']
  },
  plugins: [
    new StylelintPlugin({
      files: [
        'public/**/*.vue',
        'public/**/*.scss'
      ]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new HappyPack({
    //   id: 'ts',
    //   threads: 4,
    //   loaders: [
    //     {
    //       loader: 'ts-loader',
    //       options: {
    //         appendTsSuffixTo: [/\.vue$/],
    //         happyPackMode: true
    //       }
    //     }
    //   ]
    // }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tslint: true,
      vue: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.worker.js$/,
        exclude: /node_modules/,
        loader: 'worker-loader'
      },
      {
        test: /\.ts$/,
        include: [getPath('public')],
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
            scss: 'style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/public/dist/',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = config;
