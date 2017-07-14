const path = require('path')
let express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const fs = require('fs')
const webpackConfig = require('./webpack.dev.js')

let app = express()
let compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/',// 大部分情况下和 `output.publicPath`相同
}))

app.use(hotMiddleware(compiler))

app.listen(3000, function () {
  console.log("Listening on port 3000!");
})