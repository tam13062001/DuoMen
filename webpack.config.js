require('dotenv/config')
const util = require('util')
const defaultConfig = require('@wordpress/scripts/config/webpack.config')
const path = require('path')

const getWebpackEntryPoints = () => {
  const entries = defaultConfig.entry()
  const adminIndexPath = path.resolve(__dirname, 'src/admin/index.ts')
  const publicIndexPath = path.resolve(__dirname, 'src/public/index.ts')
  if (adminIndexPath) {
    entries['admin/index'] = adminIndexPath
  }
  if (publicIndexPath) {
    entries['public/index'] = publicIndexPath
  }
  entries['admin/multi-language'] = path.resolve(__dirname, 'src/admin/gutenberg-multilang-loader.jsx')
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