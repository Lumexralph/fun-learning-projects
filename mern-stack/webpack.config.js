const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry:{
    app: './src/App.jsx',
    vendor: ['react','react-dom','whatwg-fetch','babel-polyfill', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, "static"),
    filename: 'app.bundle.js'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
  ],
  module: {

    rules: [

      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          presets: ['react','env']
        }
      },
    ]
  },
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
    '/api/*': {
    target: 'http://localhost:3000'
          }
        }
    }
};