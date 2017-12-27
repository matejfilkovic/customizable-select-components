const path = require('path')
const webpackMerge = require('webpack-merge')

const commonConfig = require('./webpack.common.js')

const entry = path.join(__dirname, './src/demo')

const outputPath = path.join(__dirname, './public')

module.exports = () => {
  return webpackMerge(commonConfig(entry, outputPath), {})
}
