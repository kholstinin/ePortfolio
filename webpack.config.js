const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'js');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './js/entry.js'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },

  target: "electron",

  devServer: {
    contentBase: './dist',
    publicPath: 'http://localhost:8080/built/'
  },

  module : {
    loaders : [
      {
        test : /\.js/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};