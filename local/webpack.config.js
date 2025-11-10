require('dotenv/config')
const util = require('util')
const defaultConfig = require('@wordpress/scripts/config/webpack.config')
const path = require('path')
const fs = require('fs')
const {globSync} = require("glob");

const getWebpackEntryPoints = () => {
  const entries = defaultConfig.entry()
  // const files = globSync('*/index.js', { cwd: path.resolve('src'), absolute: true })
  // files.forEach(entry => {
  //   console.log('xxx', entry)
  // })
  // console.log(files)
  entries['admin/index'] = path.resolve(__dirname, 'src/admin/index.js')
  entries['public/index'] = path.resolve(__dirname, 'src/public/index.js')
  return entries
}

const config = {
  ...defaultConfig,
  entry: getWebpackEntryPoints
}

config.output.path = path.resolve(__dirname, 'theme/build')

const message = util.inspect(config, false, null, true)
// console.log(message)

module.exports = config