'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: ['./public/graphiql/src/index.js'],
  output: {
    path: __dirname + '/tmp/graphql/',
    filename: 'bundle-[hash:6].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: './public/graphiql/src/index.template.html'
    })
  ],
  colors: true,
  progress: true
};
