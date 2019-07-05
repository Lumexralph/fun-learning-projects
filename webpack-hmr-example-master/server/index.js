const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const webpackconfig = require('../webpack.config');

const app = express();
app.use(express.static('www'));

const webpackCompiler = webpack(webpackconfig);
const wpmw = webpackMiddleware(webpackCompiler,{});
app.use(wpmw);
const wphmw = webpackHotMiddleware(webpackCompiler);
app.use(wphmw);

app.listen(4000, () => {
  console.log('Example app listening on port 4000!')
});