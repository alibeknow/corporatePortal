const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../build/public'),
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      id: 'root',
      title: 'corporate-portal',
      template: path.join(__dirname, './index.html')
    })
  ],
});
