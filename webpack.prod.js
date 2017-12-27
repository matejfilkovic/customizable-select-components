const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common.js')

const entry = path.join(__dirname, './src/demo')

const outputPath = path.join(__dirname, './public')

module.exports = merge(common(entry, outputPath), {
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
})
