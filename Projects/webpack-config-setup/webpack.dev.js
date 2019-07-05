const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common');
const HMRPlugin = new webpack.HotModuleReplacementPlugin();


const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    HMRPlugin
  ],
};

module.exports = merge(common, config);

// npx webpack --config webpack.config.js
